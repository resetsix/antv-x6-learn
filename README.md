## a repository to learn antv/x6 demo

## Q&A

### Q1:点击 node 也会进行拖拽

A1: React `StrictMode`严格模式下会渲染两次画布。

要么关闭严格模式，要么在组件每次渲染时保证销毁上一次的 graph 实例。

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