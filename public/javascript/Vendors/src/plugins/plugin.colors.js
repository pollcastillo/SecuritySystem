import { DoughnutController, PolarAreaController, defaults } from '../index.js';
const BORDER_COLORS = [
    'rgb(54, 162, 235)', // blue
    'rgb(255, 99, 132)', // red
    'rgb(255, 159, 64)', // orange
    'rgb(255, 205, 86)', // yellow
    'rgb(75, 192, 192)', // green
    'rgb(153, 102, 255)', // purple
    'rgb(201, 203, 207)' // grey
];
// Border colors with 50% transparency
const BACKGROUND_COLORS = /* #__PURE__ */ BORDER_COLORS.map(color => color.replace('rgb(', 'rgba(').replace(')', ', 0.5)'));
function getBorderColor(i) {
    return BORDER_COLORS[i % BORDER_COLORS.length];
}
function getBackgroundColor(i) {
    return BACKGROUND_COLORS[i % BACKGROUND_COLORS.length];
}
function colorizeDefaultDataset(dataset, i) {
    dataset.borderColor = getBorderColor(i);
    dataset.backgroundColor = getBackgroundColor(i);
    return ++i;
}
function colorizeDoughnutDataset(dataset, i) {
    dataset.backgroundColor = dataset.data.map(() => getBorderColor(i++));
    return i;
}
function colorizePolarAreaDataset(dataset, i) {
    dataset.backgroundColor = dataset.data.map(() => getBackgroundColor(i++));
    return i;
}
function getColorizer(chart) {
    let i = 0;
    return (dataset, datasetIndex) => {
        const controller = chart.getDatasetMeta(datasetIndex).controller;
        if (controller instanceof DoughnutController) {
            i = colorizeDoughnutDataset(dataset, i);
        }
        else if (controller instanceof PolarAreaController) {
            i = colorizePolarAreaDataset(dataset, i);
        }
        else if (controller) {
            i = colorizeDefaultDataset(dataset, i);
        }
    };
}
function containsColorsDefinitions(descriptors) {
    let k;
    for (k in descriptors) {
        if (descriptors[k].borderColor || descriptors[k].backgroundColor) {
            return true;
        }
    }
    return false;
}
function containsColorsDefinition(descriptor) {
    return descriptor && (descriptor.borderColor || descriptor.backgroundColor);
}
function containsDefaultColorsDefenitions() {
    return defaults.borderColor !== 'rgba(0,0,0,0.1)' || defaults.backgroundColor !== 'rgba(0,0,0,0.1)';
}
export default {
    id: 'colors',
    defaults: {
        enabled: true,
        forceOverride: false
    },
    beforeLayout(chart, _args, options) {
        if (!options.enabled) {
            return;
        }
        const { data: { datasets }, options: chartOptions } = chart.config;
        const { elements } = chartOptions;
        const containsColorDefenition = (containsColorsDefinitions(datasets) ||
            containsColorsDefinition(chartOptions) ||
            (elements && containsColorsDefinitions(elements)) ||
            containsDefaultColorsDefenitions());
        if (!options.forceOverride && containsColorDefenition) {
            return;
        }
        const colorizer = getColorizer(chart);
        datasets.forEach(colorizer);
    }
};
