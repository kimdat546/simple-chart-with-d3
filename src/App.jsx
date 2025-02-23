import ChartComponent from "./ChartComponent";

function App() {
    const data1 = [
        { label: "Passed", value: 20, color: "#94c64a" },
        { label: "Failed", value: 10, color: "#f66384" },
        { label: "Blocked", value: 15, color: "#e8a73e" },
        { label: "Invalid", value: 25, color: "#6610f2" },
        { label: "Skipped", value: 15, color: "#737376" },
        { label: "Untested", value: 15, color: "#c1c1c1" },
    ];
    const data2 = [
        { label: "Passed", value: 70, color: "#697060" },
        { label: "Failed", value: 30, color: "#4a433d" },
    ];

    return (
        <div className="container">
            <div className="charts">
                <ChartComponent data={data1} />
                <ChartComponent data={data2} />
            </div>
            <h3 className="title">Chart with d3js</h3>
        </div>
    );
}

export default App;
