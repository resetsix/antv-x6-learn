## a repository to learn antv/x6 demo

## Q&A

### Q1:点击 node 也会进行拖拽

A1: 在函数式组件中，当画布渲染时需要保证销毁上一次的 graph 实例。

```tsx
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

    // 增加这个：销毁实例
    return () => graphRef.current?.dispose();
  }, []);

  return (
    <div ref={containerRef} style={{ width: "50vw", height: "50vh" }} />
  );
};
```