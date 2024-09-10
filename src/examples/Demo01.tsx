import React, { useRef, useEffect } from "react";
import { Graph, Node } from "@antv/x6";
import { register } from "@antv/x6-react-shape";
import { Dropdown } from "antd";
import "./Demo01.css";

const CustomComponent: React.FC<{ node: Node }> = ({ node }) => {
    const label = node.prop("label");
    return (
        <Dropdown
            menu={{
                items: [
                    {
                        key: "copy",
                        label: "复制",
                        onClick: (e) => console.log("点击了复制", e.key),
                    },
                    {
                        key: "paste",
                        label: "粘贴",
                        onClick: (e) => console.log("点击了粘贴", e.key),
                    },
                    {
                        key: "delete",
                        label: "删除",
                        onClick: (e) => console.log("点击了删除", e.key),
                    },
                ],
            }}
            trigger={["contextMenu"]}
        >
            <div className="custom-react-node">{label}</div>
        </Dropdown>
    );
};

register({
    shape: "custom-react-node",
    width: 100,
    height: 40,
    component: CustomComponent,
});

const data = {
    nodes: [
        {
            id: "node1",
            shape: "custom-react-node",
            x: 40,
            y: 40,
            label: "hello",
        },
        {
            id: "node2",
            shape: "custom-react-node",
            x: 160,
            y: 180,
            label: "world",
        },
    ],
    edges: [
        {
            shape: "edge",
            source: "node1",
            target: "node2",
            label: "x6",
            attrs: {
                line: {
                    stroke: "#8f8f8f",
                    strokeWidth: 1,
                },
            },
        },
    ],
};

export const Demo01: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const graphRef = useRef<Graph | null>(null);

    useEffect(() => {
        if (containerRef.current) {
            const graph = new Graph({
                container: containerRef.current,
                background: {
                    color: "#F2F7FA",
                },
            });
            graphRef.current = graph;

            graph.fromJSON(data);
            graph.centerContent();
        }

        // 组件卸载时，销毁 graph 实例
        return () => graphRef.current?.dispose();
        // return () => {
        //     if (graphRef.current) {
        //         graphRef.current.dispose();
        //         graphRef.current = null;
        //     }
        // };
    }, []);

    return (
        <div className="use-plugin-app">
            <div
                className="app-content"
                ref={containerRef}
                style={{ width: "50vw", height: "50vh" }}
            />
        </div>
    );
};
