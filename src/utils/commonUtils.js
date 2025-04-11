const calcView = (statistics) => {
    const view = statistics.reduce((acc, curr) => {
        return acc + curr.view_count;
    }, 0);
    return view;
};

export { calcView };
