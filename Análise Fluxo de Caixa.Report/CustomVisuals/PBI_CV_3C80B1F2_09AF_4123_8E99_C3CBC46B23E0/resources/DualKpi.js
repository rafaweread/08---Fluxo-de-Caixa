/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

/* tslint:disable:max-file-line-count */
/* Do not copy this TSLint exclusion onto additional files. */
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var PBI_CV_3C80B1F2_09AF_4123_8E99_C3CBC46B23E0;
        (function (PBI_CV_3C80B1F2_09AF_4123_8E99_C3CBC46B23E0) {
            var textMeasurementService = powerbi.TextMeasurementService;
            var DualKpiSize;
            (function (DualKpiSize) {
                DualKpiSize[DualKpiSize["supersmall"] = 0] = "supersmall";
                DualKpiSize[DualKpiSize["extrasmall"] = 1] = "extrasmall";
                DualKpiSize[DualKpiSize["small"] = 2] = "small";
                DualKpiSize[DualKpiSize["medium"] = 3] = "medium";
                DualKpiSize[DualKpiSize["large"] = 4] = "large";
            })(DualKpiSize = PBI_CV_3C80B1F2_09AF_4123_8E99_C3CBC46B23E0.DualKpiSize || (PBI_CV_3C80B1F2_09AF_4123_8E99_C3CBC46B23E0.DualKpiSize = {}));
            var DualKpiChartPositionType;
            (function (DualKpiChartPositionType) {
                DualKpiChartPositionType[DualKpiChartPositionType["top"] = "top"] = "top";
                DualKpiChartPositionType[DualKpiChartPositionType["bottom"] = "bottom"] = "bottom";
            })(DualKpiChartPositionType = PBI_CV_3C80B1F2_09AF_4123_8E99_C3CBC46B23E0.DualKpiChartPositionType || (PBI_CV_3C80B1F2_09AF_4123_8E99_C3CBC46B23E0.DualKpiChartPositionType = {}));
            var DualKpiChartType;
            (function (DualKpiChartType) {
                DualKpiChartType.AREA = 'Area';
                DualKpiChartType.LINE = 'Line';
                DualKpiChartType.type = powerbi.createEnumType([
                    { value: "area", displayName: DualKpiChartType.AREA },
                    { value: "line", displayName: DualKpiChartType.LINE },
                ]);
            })(DualKpiChartType || (DualKpiChartType = {}));
            var DualKpi = (function () {
                function DualKpi() {
                    this.chartLeftMargin = 35;
                    this.touchEventsEnabled = false;
                    this.titleSize = 0;
                }
                DualKpi.prototype.init = function (options) {
                    this.target = options.element;
                    this.size = DualKpiSize.small;
                    this.sizeCssClass = "small";
                    this.valueFormatter = d3.format(".3s");
                    this.axisNumberFormatter = d3.format(".2s");
                    this.commaNumberFormatter = d3.format(",");
                    this.timeFormatter = d3.time.format("%m/%d/%y");
                    this.dataBisector = d3.bisector(function (d) { return d.date; }).left;
                    this.dispatch = d3.dispatch("onDualKpiMouseMove", "onDualKpiMouseOut");
                    this.initContainer();
                    this.initMouseEvents();
                };
                DualKpi.prototype.initMouseEvents = function () {
                    var dispatch = this.dispatch;
                    var target = this.target;
                    var targetElement = d3.select(target[0]);
                    var onMouseMove = function (e) {
                        dispatch.onDualKpiMouseMove(d3.mouse(this));
                    };
                    targetElement.on("mousemove", onMouseMove);
                    targetElement.on("mouseout", onMouseMove);
                    targetElement.on("touchmove", onMouseMove);
                    targetElement.on("touchstart", onMouseMove);
                    var onMouseOut = function (e) {
                        dispatch.onDualKpiMouseOut();
                    };
                    targetElement.on("mouseleave", onMouseOut);
                    targetElement.on("touchleave", onMouseOut);
                };
                DualKpi.prototype.initContainer = function () {
                    var xmlns = "http://www.w3.org/2000/svg";
                    var svgElem = document.createElementNS(xmlns, "svg");
                    var svgRoot = this.svgRoot = d3.select(svgElem);
                    svgRoot
                        .attr("class", "dualKpi");
                    this.chartGroupTop = this.createChartGroup(svgRoot);
                    this.chartGroupBottom = this.createChartGroup(svgRoot);
                    this.bottomContainer = this.createBottomContainer(svgRoot);
                    this.target.append(svgElem);
                };
                DualKpi.prototype.createBottomContainer = function (svgRoot) {
                    var bottomContainer = svgRoot
                        .append("g")
                        .attr("class", "bottom-title-container")
                        .classed("invisible", true);
                    var chartTitleElement = bottomContainer
                        .append("text")
                        .classed("title", true);
                    var warningGroup = bottomContainer
                        .append("g")
                        .classed("warning-group", true);
                    var warningIcon = warningGroup
                        .append("path")
                        .classed("warning-icon", true);
                    var warningTitle = warningGroup
                        .append("title")
                        .classed("warning-title", true);
                    var infoGroup = bottomContainer
                        .append("g")
                        .classed("info-group", true);
                    var infoIcon = infoGroup
                        .append("path")
                        .classed("info-icon", true);
                    var infoTitle = infoIcon
                        .append("title")
                        .classed("info-title", true);
                    var dateRangeText = bottomContainer
                        .append("text")
                        .classed("date-range-text", true)
                        .attr("text-anchor", "end");
                    return {
                        bottomContainer: bottomContainer,
                        chartTitleElement: chartTitleElement,
                        warning: {
                            group: warningGroup,
                            icon: warningIcon,
                            title: warningTitle
                        },
                        info: {
                            group: infoGroup,
                            icon: infoIcon,
                            title: infoTitle
                        },
                        dateRangeText: dateRangeText
                    };
                };
                DualKpi.prototype.createChartGroup = function (svgRoot) {
                    var chartGroup = svgRoot
                        .append("g")
                        .attr("class", "chartGroup");
                    var chartArea = chartGroup
                        .append("path")
                        .attr("class", "area");
                    var yAxis = chartGroup
                        .append("g")
                        .attr("class", "axis");
                    var hoverLine = chartGroup
                        .append("line")
                        .attr("class", "hoverLine");
                    var hoverDataContainer = this.createHoverDataContainer(chartGroup);
                    var chartOverlay = this.createChartOverlay(chartGroup);
                    var zeroAxis = chartGroup
                        .append("path")
                        .attr("class", "zero-axis");
                    //this.initMouseClearEvents(hoverDataContainer, hoverLine);
                    return {
                        group: chartGroup,
                        area: chartArea,
                        yAxis: yAxis,
                        hoverLine: hoverLine,
                        hoverDataContainer: hoverDataContainer,
                        chartOverlay: chartOverlay,
                        zeroAxis: zeroAxis
                    };
                };
                DualKpi.prototype.createChartOverlay = function (chartGroup) {
                    var chartOverlayTextGroup = chartGroup
                        .append("g")
                        .classed("group", true);
                    var title = chartOverlayTextGroup
                        .append("text")
                        .classed("data-title", true)
                        .attr({
                        "text-anchor": "middle"
                    });
                    var text = chartOverlayTextGroup
                        .append("text")
                        .classed("data-value", true)
                        .attr({
                        "text-anchor": "middle"
                    });
                    // this rect is always invisible, used for capture mouse and touch events
                    var chartOverlayRect = chartOverlayTextGroup
                        .append("rect")
                        .attr("style", "stroke: none; fill: #000;opacity:0;");
                    var rectTitle = chartOverlayTextGroup
                        .append("title");
                    return {
                        group: chartOverlayTextGroup,
                        title: title,
                        text: text,
                        rect: chartOverlayRect,
                        rectTitle: rectTitle
                    };
                };
                DualKpi.getChartSize = function (viewport) {
                    var height = viewport.height, width = viewport.width;
                    if (width < 215 || height < 110) {
                        return DualKpiSize.supersmall;
                    }
                    if (width < 245 || height < 130) {
                        return DualKpiSize.extrasmall;
                    }
                    if (width < 350 || height < 280) {
                        return DualKpiSize.small;
                    }
                    if (width < 450 || height < 450) {
                        return DualKpiSize.medium;
                    }
                    return DualKpiSize.large;
                };
                DualKpi.prototype.update = function (options) {
                    var dataView = this.dataView = options.dataViews && options.dataViews[0];
                    if (!dataView ||
                        !dataView.metadata ||
                        !dataView.metadata.columns) {
                        this.displayRootElement(false);
                        return;
                    }
                    var data = this.data = DualKpi.converter(this.dataView);
                    var availableHeight = options.viewport.height < 90 ? 90 : options.viewport.height, availableWidth = options.viewport.width < 200 ? 200 : options.viewport.width, chartWidth = availableWidth, chartSpaceBetween, chartTitleSpace, iconOffset;
                    var size = DualKpi.getChartSize({ height: availableHeight, width: availableWidth });
                    switch (size) {
                        case DualKpiSize.large:
                            this.size = DualKpiSize.large;
                            this.sizeCssClass = "large";
                            iconOffset = -1;
                            chartSpaceBetween = 25;
                            chartTitleSpace = 46;
                            break;
                        case DualKpiSize.medium:
                            this.size = DualKpiSize.medium;
                            this.sizeCssClass = "medium";
                            iconOffset = -8;
                            chartSpaceBetween = 20;
                            chartTitleSpace = 30;
                            break;
                        case DualKpiSize.small:
                            this.size = DualKpiSize.small;
                            this.sizeCssClass = "small";
                            iconOffset = -6;
                            chartSpaceBetween = 15;
                            chartTitleSpace = 22;
                            break;
                        case DualKpiSize.extrasmall:
                            this.size = DualKpiSize.extrasmall;
                            this.sizeCssClass = "extra-small";
                            iconOffset = -8;
                            chartSpaceBetween = 12;
                            chartTitleSpace = 20;
                            break;
                        case DualKpiSize.supersmall:
                            this.size = DualKpiSize.supersmall;
                            this.sizeCssClass = "super-small";
                            iconOffset = -8;
                            chartSpaceBetween = 10;
                            chartTitleSpace = 18;
                            break;
                        default:
                            break;
                    }
                    this.titleSize = DualKpi.DefaultTitleSizes[this.sizeCssClass];
                    this.updateViewport({
                        width: availableWidth,
                        height: availableHeight
                    });
                    var chartHeight = (availableHeight - (chartSpaceBetween + chartTitleSpace)) / 2;
                    var topChartAxisConfig = { min: data.topChartAxisMin, max: data.topChartAxisMax };
                    var bottomChartAxisConfig = { min: data.bottomChartAxisMin, max: data.bottomChartAxisMax };
                    var topChartPercentChangeStartPoint = DualKpi.getPercentChangeStartPoint(data.topValues, data.topPercentCalcDate);
                    var bottomChartPercentChangeStartPoint = DualKpi.getPercentChangeStartPoint(data.bottomValues, data.bottomPercentCalcDate);
                    var wasDataSetRendered = data.topValues.length > 0 || data.bottomValues.length > 0;
                    this.displayRootElement(wasDataSetRendered);
                    // draw top chart
                    if (data.topValues.length > 0) {
                        this.drawChart({
                            element: this.chartGroupTop,
                            abbreviateValue: data.abbreviateValues,
                            abbreviateHoverValue: data.abbreviateHoverValues,
                            axisConfig: topChartAxisConfig,
                            chartData: data.topValues,
                            chartTitle: data.topChartName,
                            chartType: data.topChartType,
                            height: chartHeight,
                            percentChangeStartPoint: topChartPercentChangeStartPoint,
                            showZeroLine: data.topChartZeroLine,
                            tooltipText: data.topChartToolTipText,
                            top: 0,
                            valueAsPercent: data.topValueAsPercent,
                            width: chartWidth,
                            position: DualKpiChartPositionType["top"],
                            showTextOverlay: data.showKpiValues,
                            showDefaultTextOverlay: !data.topChartShowKpiValues,
                            defaultTextOverlay: data.topChartDefaultKpiValue
                        });
                    }
                    // draw bottom chart
                    if (data.bottomValues.length > 0) {
                        this.drawChart({
                            element: this.chartGroupBottom,
                            abbreviateValue: data.abbreviateValues,
                            abbreviateHoverValue: data.abbreviateHoverValues,
                            axisConfig: bottomChartAxisConfig,
                            chartData: data.bottomValues,
                            chartTitle: data.bottomChartName,
                            chartType: data.bottomChartType,
                            height: chartHeight,
                            percentChangeStartPoint: bottomChartPercentChangeStartPoint,
                            showZeroLine: data.bottomChartZeroLine,
                            tooltipText: data.bottomChartToolTipText,
                            top: chartHeight + chartSpaceBetween,
                            valueAsPercent: data.bottomValueAsPercent,
                            width: chartWidth,
                            position: DualKpiChartPositionType["bottom"],
                            showTextOverlay: data.showKpiValues,
                            showDefaultTextOverlay: !data.bottomChartShowKpiValues,
                            defaultTextOverlay: data.bottomChartDefaultKpiValue
                        });
                    }
                    if (wasDataSetRendered) {
                        this.drawBottomContainer(chartWidth, chartHeight, chartTitleSpace, chartSpaceBetween, iconOffset);
                    }
                };
                DualKpi.prototype.displayRootElement = function (isRootElementVisible) {
                    if (isRootElementVisible === void 0) { isRootElementVisible = true; }
                    if (!this.svgRoot) {
                        return;
                    }
                    var display = isRootElementVisible
                        ? null
                        : "none";
                    this.svgRoot.style("display", display);
                };
                DualKpi.prototype.updateViewport = function (viewport) {
                    if (!this.viewport || (this.viewport.width !== viewport.width) || (this.viewport.height !== viewport.height)) {
                        this.svgRoot.attr({
                            width: viewport.width,
                            height: viewport.height
                        });
                    }
                    this.viewport = viewport;
                };
                DualKpi.prototype.enumerateObjectInstances = function (options) {
                    var instances = [];
                    switch (options.objectName) {
                        case "dualKpiProperties":
                            var dualKpiProperties = {
                                objectName: "dualKpiProperties",
                                displayName: "Dual KPI Properties",
                                selector: null,
                                properties: {
                                    titleText: DualKpi.getTitleText(this.dataView),
                                    abbreviateValues: DualKpi.getAbbreviateValues(this.dataView),
                                    abbreviateHoverValues: DualKpi.getAbbreviateHoverValues(this.dataView),
                                    shortKpiTooltip: DualKpi.getShortKpiTooltip(this.dataView),
                                    topChartToolTipText: DualKpi.getTopChartToolTipText(this.dataView),
                                    bottomChartToolTipText: DualKpi.getBottomChartToolTipText(this.dataView),
                                    warningTooltipText: DualKpi.getWarningTooltipText(this.dataView),
                                    showStaleDataWarning: DualKpi.getShowStaleDataWarning(this.dataView),
                                    staleDataTooltipText: DualKpi.getStaleDataTooltipText(this.dataView),
                                    staleDataThreshold: DualKpi.getStaleDataThreshold(this.dataView),
                                    topPercentCalcDate: DualKpi.getTopPercentCalcDate(this.dataView),
                                    bottomPercentCalcDate: DualKpi.getBottomPercentCalcDate(this.dataView)
                                }
                            };
                            instances.push(dualKpiProperties);
                            break;
                        case "dualKpiValues":
                            var dualKpiValues = {
                                objectName: "dualKpiValues",
                                displayName: "Dual KPI Values",
                                selector: null,
                                properties: {
                                    show: DualKpi.getShowKpiValues(this.dataView),
                                    showKpiValuesTop: DualKpi.getShowTopChartKpiValues(this.dataView),
                                    topChartDefaultKpiValue: DualKpi.getTopChartDefaultKpiValue(this.dataView),
                                    showKpiValuesBottom: DualKpi.getShowBottomChartKpiValues(this.dataView),
                                    bottomChartDefaultKpiValue: DualKpi.getBottomChartDefaultKpiValue(this.dataView)
                                }
                            };
                            instances.push(dualKpiValues);
                            break;
                        case "dualKpiColors":
                            var dualKpiColorsTop = {
                                objectName: "dualKpiColors",
                                displayName: "Dual KPI Top Chart Colors",
                                selector: null,
                                properties: {
                                    dataColor: DualKpi.getDataColorTop(this.dataView),
                                    textColor: DualKpi.getTextColorTop(this.dataView),
                                    opacity: DualKpi.getOpacityTop(this.dataView)
                                }
                            };
                            instances.push(dualKpiColorsTop);
                            break;
                        case "dualKpiColorsBottom":
                            var matchTopChartOptions = DualKpi.getMatchTopChartOptions(this.dataView), properties = matchTopChartOptions ?
                                { matchTopChartOptions: matchTopChartOptions } :
                                {
                                    matchTopChartOptions: matchTopChartOptions,
                                    dataColor: DualKpi.getDataColorBottom(this.dataView),
                                    textColor: DualKpi.getTextColorBottom(this.dataView),
                                    opacity: DualKpi.getOpacityBottom(this.dataView)
                                };
                            var dualKpiColorsBottom = {
                                objectName: "dualKpiColorsBottom",
                                displayName: "Dual KPI Bottom Chart Colors",
                                selector: null,
                                properties: properties
                            };
                            instances.push(dualKpiColorsBottom);
                            break;
                        case "dualKpiAxis":
                            var dualKpiAxis = {
                                objectName: "dualKpiAxis",
                                displayName: "Dual KPI Axis Settings",
                                selector: null,
                                properties: {
                                    topChartAxisMin: DualKpi.getTopChartAxisMin(this.dataView),
                                    topChartAxisMax: DualKpi.getTopChartAxisMax(this.dataView),
                                    bottomChartAxisMin: DualKpi.getBottomChartAxisMin(this.dataView),
                                    bottomChartAxisMax: DualKpi.getBottomChartAxisMax(this.dataView),
                                    topChartZeroLine: DualKpi.getTopChartZeroLine(this.dataView),
                                    bottomChartZeroLine: DualKpi.getBottomChartZeroLine(this.dataView)
                                }
                            };
                            instances.push(dualKpiAxis);
                            break;
                        case "dualKpiChart":
                            var dualKpiChart = {
                                objectName: "dualKpiChart",
                                displayName: "Dual KPI Chart Types",
                                selector: null,
                                properties: {
                                    topChartType: DualKpi.getTopChartType(this.dataView),
                                    bottomChartType: DualKpi.getBottomChartType(this.dataView)
                                }
                            };
                            instances.push(dualKpiChart);
                            break;
                    }
                    return instances;
                };
                DualKpi.getValue = function (objects, property, defaultValue) {
                    if (!objects || !objects[property.objectName]) {
                        return defaultValue;
                    }
                    var objectOrMap = objects[property.objectName];
                    var object = objectOrMap;
                    var propertyValue = object[property.propertyName];
                    if (propertyValue === undefined) {
                        return defaultValue;
                    }
                    return propertyValue;
                };
                DualKpi.validateOpacity = function (opacity) {
                    if (opacity < this.OPACITY_MIN) {
                        return this.OPACITY_MIN;
                    }
                    else if (opacity > this.OPACITY_MAX) {
                        return this.OPACITY_MAX;
                    }
                    else {
                        return opacity;
                    }
                };
                DualKpi.getTitleText = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.titleText, DualKpi.defaultValues.titleText);
                };
                DualKpi.getAbbreviateValues = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.abbreviateValues, DualKpi.defaultValues.abbreviateValues);
                };
                DualKpi.getAbbreviateHoverValues = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.abbreviateHoverValues, DualKpi.getAbbreviateValues(dataView));
                };
                DualKpi.getShortKpiTooltip = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.shortKpiTooltip, DualKpi.defaultValues.shortKpiTooltip);
                };
                DualKpi.getShowKpiValues = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.showKpiValues, DualKpi.defaultValues.showKpiValues);
                };
                DualKpi.getShowTopChartKpiValues = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.showKpiValuesTop, DualKpi.defaultValues.showKpiValuesTop);
                };
                DualKpi.getShowBottomChartKpiValues = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.showKpiValuesBottom, DualKpi.defaultValues.showKpiValuesBottom);
                };
                DualKpi.getTopChartDefaultKpiValue = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.topChartDefaultKpiValue, DualKpi.defaultValues.topChartDefaultKpiValue);
                };
                DualKpi.getBottomChartDefaultKpiValue = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.bottomChartDefaultKpiValue, DualKpi.defaultValues.bottomChartDefaultKpiValue);
                };
                DualKpi.getTopChartToolTipText = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.topChartToolTipText, DualKpi.defaultValues.topChartToolTipText);
                };
                DualKpi.getBottomChartToolTipText = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.bottomChartToolTipText, DualKpi.defaultValues.bottomChartToolTipText);
                };
                DualKpi.getWarningTooltipText = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.warningTooltipText, DualKpi.defaultValues.warningTooltipText);
                };
                DualKpi.getShowStaleDataWarning = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.showStaleDataWarning, DualKpi.defaultValues.showStaleDataWarning);
                };
                DualKpi.getStaleDataTooltipText = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.staleDataTooltipText, DualKpi.defaultValues.staleDataTooltipText);
                };
                DualKpi.getStaleDataThreshold = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.staleDataThreshold, DualKpi.defaultValues.staleDataThreshold);
                };
                DualKpi.getTopPercentCalcDate = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.topPercentCalcDate, DualKpi.defaultValues.topPercentCalcDate);
                };
                DualKpi.getBottomPercentCalcDate = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.bottomPercentCalcDate, DualKpi.defaultValues.bottomPercentCalcDate);
                };
                DualKpi.getDataColorTop = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.dataColorTop, { solid: { color: DualKpi.defaultValues.dataColor } });
                };
                DualKpi.getTextColorTop = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.textColorTop, { solid: { color: DualKpi.defaultValues.textColor } });
                };
                DualKpi.getOpacityTop = function (dataView) {
                    return dataView && dataView.metadata &&
                        this.validateOpacity(DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.opacityTop, DualKpi.defaultValues.opacity));
                };
                DualKpi.getMatchTopChartOptions = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.matchTopChartOptions, DualKpi.defaultValues.matchTopChartOptions);
                };
                DualKpi.getDataColorBottom = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.dataColorBottom, { solid: { color: DualKpi.defaultValues.dataColor } });
                };
                DualKpi.getTextColorBottom = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.textColorBottom, { solid: { color: DualKpi.defaultValues.textColor } });
                };
                DualKpi.getOpacityBottom = function (dataView) {
                    return dataView && dataView.metadata &&
                        this.validateOpacity(DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.opacityBottom, DualKpi.defaultValues.opacity));
                };
                DualKpi.getTopChartAxisMin = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.topChartAxisMin, DualKpi.defaultValues.topChartAxisMin);
                };
                DualKpi.getTopChartAxisMax = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.topChartAxisMax, DualKpi.defaultValues.topChartAxisMax);
                };
                DualKpi.getBottomChartAxisMin = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.bottomChartAxisMin, DualKpi.defaultValues.bottomChartAxisMin);
                };
                DualKpi.getBottomChartAxisMax = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.bottomChartAxisMax, DualKpi.defaultValues.bottomChartAxisMax);
                };
                DualKpi.getTopChartZeroLine = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.topChartZeroLine, DualKpi.defaultValues.topChartZeroLine);
                };
                DualKpi.getBottomChartZeroLine = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.bottomChartZeroLine, DualKpi.defaultValues.bottomChartZeroLine);
                };
                DualKpi.getTopChartType = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.topChartType, DualKpi.defaultValues.topChartType);
                };
                DualKpi.getBottomChartType = function (dataView) {
                    return dataView && dataView.metadata && DualKpi.getValue(dataView.metadata.objects, DualKpi.properties.bottomChartType, DualKpi.defaultValues.bottomChartType);
                };
                DualKpi.getDaysBetween = function (date1, date2) {
                    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                    var dayRange = Math.round(Math.abs(date1.getTime() - date2.getTime()) / oneDay);
                    return dayRange;
                };
                DualKpi.percentFormatter = function (value, showPlusMinus) {
                    var prefix = value >= 0 ? "+" : "", valueString = (Math.floor(value * 10) / 10) + "%";
                    if (showPlusMinus) {
                        valueString = prefix + valueString;
                    }
                    return valueString;
                };
                DualKpi.getPercentChange = function (startValue, endValue) {
                    if (startValue === 0) {
                        return "n/a";
                    }
                    var diff = endValue - startValue;
                    var percentChange = Math.abs(diff / startValue);
                    if (endValue < startValue) {
                        percentChange = percentChange * -1;
                    }
                    return this.percentFormatter(percentChange * 100, true);
                };
                DualKpi.getPercentChangeStartPoint = function (chartData, percentCalcDate) {
                    if (percentCalcDate !== null) {
                        var closestIndex = 0, percentCalcDateTime = percentCalcDate.getTime(), i = void 0, currTime = void 0;
                        // keep track of closest date to configured date
                        // as soon as we find a date that is more recent than configured date
                        // break and use the last date that was older than configured date.
                        // always break if we find a date that is exactly equal
                        for (i = 0; i < chartData.length; i++) {
                            currTime = chartData[i].date.getTime();
                            if (currTime === percentCalcDateTime) {
                                closestIndex = i;
                                break;
                            }
                            else if (currTime < percentCalcDateTime) {
                                closestIndex = i;
                            }
                            else {
                                break;
                            }
                        }
                        return chartData[closestIndex];
                    }
                    return chartData[0];
                };
                DualKpi.getFormatSymbol = function (format) {
                    var symbolPatterns = [
                        "[$]",
                        "[€]",
                        "[£]",
                        "[¥]",
                        "[₩]",
                        "[%]",
                    ];
                    var symbolMatcher = new RegExp(symbolPatterns.join("|"), "g");
                    //let symbols = [];
                    var match = symbolMatcher.exec(format);
                    if (!match) {
                        return undefined;
                    }
                    else {
                        return match[0];
                    }
                };
                DualKpi.converter = function (dataView) {
                    var data = {};
                    var topValueFormatSymbol = "";
                    var bottomValueFormatSymbol = "";
                    data.topChartName = "";
                    data.bottomChartName = "";
                    data.topValues = [];
                    data.bottomValues = [];
                    data.warningState = 0;
                    // get formatting pane values
                    data.title = DualKpi.getTitleText(dataView);
                    data.abbreviateValues = DualKpi.getAbbreviateValues(dataView);
                    data.abbreviateHoverValues = DualKpi.getAbbreviateHoverValues(dataView);
                    data.shortKpiTooltip = DualKpi.getShortKpiTooltip(dataView);
                    data.showKpiValues = DualKpi.getShowKpiValues(dataView);
                    data.topChartShowKpiValues = DualKpi.getShowTopChartKpiValues(dataView);
                    data.bottomChartShowKpiValues = DualKpi.getShowBottomChartKpiValues(dataView);
                    data.topChartDefaultKpiValue = DualKpi.getTopChartDefaultKpiValue(dataView);
                    data.bottomChartDefaultKpiValue = DualKpi.getBottomChartDefaultKpiValue(dataView);
                    data.topChartToolTipText = DualKpi.getTopChartToolTipText(dataView);
                    data.bottomChartToolTipText = DualKpi.getBottomChartToolTipText(dataView);
                    data.warningTooltipText = DualKpi.getWarningTooltipText(dataView);
                    data.showStaleDataWarning = DualKpi.getShowStaleDataWarning(dataView);
                    data.staleDataTooltipText = DualKpi.getStaleDataTooltipText(dataView);
                    data.staleDataThreshold = DualKpi.getStaleDataThreshold(dataView);
                    data.dataColorTop = DualKpi.getDataColorTop(dataView).solid.color;
                    data.textColorTop = DualKpi.getTextColorTop(dataView).solid.color;
                    data.opacityTop = DualKpi.getOpacityTop(dataView);
                    data.matchTopChartOptions = DualKpi.getMatchTopChartOptions(dataView);
                    data.dataColorBottom = data.matchTopChartOptions ? DualKpi.getDataColorTop(dataView).solid.color : DualKpi.getDataColorBottom(dataView).solid.color;
                    data.textColorBottom = data.matchTopChartOptions ? DualKpi.getTextColorTop(dataView).solid.color : DualKpi.getTextColorBottom(dataView).solid.color;
                    data.opacityBottom = data.matchTopChartOptions ? DualKpi.getOpacityTop(dataView) : DualKpi.getOpacityBottom(dataView);
                    data.topChartAxisMin = DualKpi.getTopChartAxisMin(dataView);
                    data.topChartAxisMax = DualKpi.getTopChartAxisMax(dataView);
                    data.bottomChartAxisMin = DualKpi.getBottomChartAxisMin(dataView);
                    data.bottomChartAxisMax = DualKpi.getBottomChartAxisMax(dataView);
                    data.topChartZeroLine = DualKpi.getTopChartZeroLine(dataView);
                    data.bottomChartZeroLine = DualKpi.getBottomChartZeroLine(dataView);
                    data.topChartType = DualKpi.getTopChartType(dataView);
                    data.bottomChartType = DualKpi.getBottomChartType(dataView);
                    var axisCol = -1, topValuesCol = -1, bottomValuesCol = -1, warningStateCol = -1, topPercentDateCol = -1, bottomPercentDateCol = -1, rows = [];
                    var metadataColumns = dataView.metadata.columns;
                    for (var i = 0; i < metadataColumns.length; i++) {
                        var col = metadataColumns[i];
                        if (col.roles) {
                            // not else ifs because in a column can have multiple roles
                            if (col.roles["axis"])
                                axisCol = i;
                            if (col.roles["topvalues"]) {
                                topValuesCol = i;
                                data.topChartName = col.displayName;
                                topValueFormatSymbol = this.getFormatSymbol(col.format);
                            }
                            if (col.roles["bottomvalues"]) {
                                bottomValuesCol = i;
                                data.bottomChartName = col.displayName;
                                bottomValueFormatSymbol = this.getFormatSymbol(col.format);
                            }
                            if (col.roles["warningstate"]) {
                                warningStateCol = i;
                            }
                            if (col.roles["toppercentdate"]) {
                                topPercentDateCol = i;
                            }
                            if (col.roles["bottompercentdate"]) {
                                bottomPercentDateCol = i;
                            }
                        }
                    }
                    if (dataView && dataView.table) {
                        rows = dataView.table.rows;
                    }
                    data.topValueAsPercent = topValueFormatSymbol === "%" ? true : false;
                    data.bottomValueAsPercent = bottomValueFormatSymbol === "%" ? true : false;
                    // if percent dates are in data use that, otherwise get from formatting pane/default values
                    data.topPercentCalcDate = topPercentDateCol > -1 && rows[0] ? new Date(rows[0][topPercentDateCol]) : new Date(DualKpi.getTopPercentCalcDate(dataView));
                    data.bottomPercentCalcDate = bottomPercentDateCol > -1 && rows[0] ? new Date(rows[0][bottomPercentDateCol]) : new Date(DualKpi.getBottomPercentCalcDate(dataView));
                    for (var i = 0; i < rows.length; i++) {
                        var date = null;
                        if (axisCol > -1) {
                            var timestamp = Date.parse(rows[i][axisCol]);
                            if (!isNaN(timestamp)) {
                                date = new Date(timestamp);
                            }
                            else {
                                continue;
                            }
                        }
                        else {
                            date = new Date();
                        }
                        var topValue = topValuesCol > -1 ? rows[i][topValuesCol] : 0;
                        var bottomValue = bottomValuesCol > -1 ? rows[i][bottomValuesCol] : 0;
                        if (data.topValueAsPercent) {
                            topValue *= 100;
                        }
                        if (data.bottomValueAsPercent) {
                            bottomValue *= 100;
                        }
                        data.topValues.push({
                            date: date,
                            value: topValue
                        });
                        data.bottomValues.push({
                            date: date,
                            value: bottomValue
                        });
                    }
                    if ((warningStateCol > -1) && (rows.length > 0)) {
                        data.warningState = rows[rows.length - 1][warningStateCol];
                    }
                    return data;
                };
                DualKpi.prototype.createHoverDataContainer = function (chartGroup) {
                    var hoverDataContainer = chartGroup.append("g")
                        .attr("class", "hover-data-container")
                        .classed("invisible", true);
                    var date = hoverDataContainer.append("text")
                        .attr("class", "hover-text date")
                        .text("0");
                    var text = hoverDataContainer.append("text")
                        .attr("class", "hover-text value")
                        .attr("text-anchor", "middle")
                        .text("0");
                    var percent = hoverDataContainer.append("text")
                        .attr("class", "hover-text percent")
                        .attr("text-anchor", "end")
                        .text("0");
                    return {
                        container: hoverDataContainer,
                        date: date,
                        text: text,
                        percent: percent
                    };
                };
                DualKpi.prototype.updateHoverDataContainer = function (hoverDataContainer, chartBottom, chartLeft, chartWidth, isTopChart) {
                    var textColor = isTopChart ? this.data.textColorTop : this.data.textColorBottom;
                    var hoverDate = hoverDataContainer.date;
                    var centerX = chartWidth / 2;
                    if (chartWidth < 300) {
                        centerX *= 0.85;
                    }
                    hoverDate
                        .attr("class", "hover-text date")
                        .classed(this.sizeCssClass, true)
                        .attr("fill", textColor)
                        .text("0");
                    var hoverValue = hoverDataContainer.text;
                    hoverValue
                        .attr("class", "hover-text value")
                        .classed(this.sizeCssClass, true)
                        .attr("transform", "translate(" + centerX + ",0)")
                        .attr("fill", textColor)
                        .text("0");
                    var hoverPercent = hoverDataContainer.percent;
                    hoverPercent
                        .attr("class", "hover-text percent")
                        .classed(this.sizeCssClass, true)
                        .text("0")
                        .attr("fill", textColor)
                        .attr("transform", "translate(" + (chartWidth) + ",0)");
                    hoverDataContainer.container
                        .attr("transform", "translate(" + 0 + "," + (chartBottom + this.titleSize - 2) + ")");
                };
                DualKpi.prototype.showHoverData = function (hoverDataContainer, dataPoint, latestValue, valueAsPercent, abbreviateHoverValue) {
                    var _this = this;
                    var hoverDate = hoverDataContainer.date;
                    hoverDate
                        .datum(dataPoint)
                        .text(function (d) { return _this.timeFormatter(d.date); });
                    var hoverValue = hoverDataContainer.text;
                    hoverValue
                        .datum(dataPoint)
                        .text(function (d) {
                        var value = abbreviateHoverValue ? _this.valueFormatter(d.value) : _this.commaNumberFormatter(Math.round(d.value));
                        if (valueAsPercent) {
                            return DualKpi.percentFormatter(d.value);
                        }
                        return value;
                    });
                    var hoverPercent = hoverDataContainer.percent;
                    hoverPercent
                        .datum(dataPoint)
                        .text(function (d) {
                        if (valueAsPercent) {
                            return DualKpi.percentFormatter(latestValue - d.value);
                        }
                        return DualKpi.getPercentChange(d.value, latestValue);
                    });
                    this.bottomContainer.bottomContainer.classed("hidden", true);
                    hoverDataContainer.container.classed("invisible", false);
                };
                DualKpi.prototype.hideHoverData = function (hoverDataContainer, hoverLine) {
                    hoverDataContainer.container.classed("invisible", true);
                    this.bottomContainer.bottomContainer.classed("hidden", false);
                    if (hoverLine) {
                        hoverLine.classed("invisible", true);
                    }
                };
                /*
                *   to show tooltip information on mobile we show a popup on touch event
                */
                DualKpi.prototype.showMobileTooltip = function (message) {
                    var _this = this;
                    if (!this.mobileTooltip) {
                        this.mobileTooltip = d3.select(this.target[0]).append("div")
                            .classed({ "hidden": true, "mobile-tooltip": true });
                        this.svgRoot.on("touchstart", function () {
                            _this.hideMobileTooltip();
                        });
                        this.mobileTooltip.on("touchstart", function () {
                            _this.hideMobileTooltip();
                        });
                        this.touchEventsEnabled = true;
                    }
                    // prevent hide from being called, and prevent hover interaction from occuring on same event
                    d3.event.stopPropagation();
                    this.mobileTooltip.text(message);
                    this.mobileTooltip.classed("hidden", false);
                };
                DualKpi.prototype.hideMobileTooltip = function () {
                    this.mobileTooltip.classed("hidden", true);
                };
                DualKpi.prototype.drawBottomContainer = function (chartWidth, chartHeight, chartTitleSpace, chartSpaceBetween, iconOffset) {
                    //let warningIconShowing = false;
                    var infoIconShowing = false;
                    var chartTitleElement = this.bottomContainer.chartTitleElement
                        .attr("class", "title")
                        .classed(this.sizeCssClass, true)
                        .text(this.data.title);
                    var iconWidth = 22;
                    var iconScaleTransform = "";
                    var iconY = (-chartTitleSpace + (chartTitleSpace / 2) + iconOffset);
                    if (this.size === DualKpiSize.small || this.size === DualKpiSize.extrasmall || this.size === DualKpiSize.supersmall) {
                        iconScaleTransform = "scale(0.75)";
                        iconWidth = 16;
                    }
                    // add warning icon
                    if (this.data.warningState < 0) {
                        this.createWarningMessage(chartTitleElement, iconY, iconScaleTransform, iconWidth);
                    }
                    // add info icon
                    if (this.data.topValues.length > 0) {
                        var today = new Date();
                        var dataDaysOld = DualKpi.getDaysBetween(this.data.topValues[this.data.topValues.length - 1].date, today);
                        if (dataDaysOld >= this.data.staleDataThreshold && this.data.showStaleDataWarning) {
                            infoIconShowing = true;
                            this.createInfoMessage(iconY, iconScaleTransform, iconWidth, chartWidth, dataDaysOld);
                        }
                        else {
                            this.hideInfoMessage();
                        }
                        // add day range text
                        var dayRange = DualKpi.getDaysBetween(this.data.topValues[0].date, this.data.topValues[this.data.topValues.length - 1].date);
                        var dayRangeElement = this.bottomContainer.dateRangeText;
                        dayRangeElement
                            .attr("class", "date-range-text")
                            .classed(this.sizeCssClass, true)
                            .text("last " + dayRange + " days");
                        var dayRangeLeft = chartWidth - 8;
                        if (infoIconShowing) {
                            dayRangeLeft -= (iconWidth); // width of icon + 8px padding
                        }
                        dayRangeElement.attr("transform", "translate(" + (dayRangeLeft) + ",0)");
                    }
                    this.bottomContainer.bottomContainer.attr("transform", "translate(5," + (this.viewport.height - 5) + ")");
                    this.bottomContainer.bottomContainer.classed("invisible", false);
                };
                DualKpi.prototype.createWarningMessage = function (chartTitleElement, iconY, iconScaleTransform, iconWidth) {
                    var _this = this;
                    var warning = this.bottomContainer.warning;
                    warning.group
                        .attr("transform", "translate(0," + (iconY) + ")");
                    var warningIcon = warning.icon;
                    warningIcon
                        .attr({
                        "d": "M24,24H8l8-16L24,24z M9.7,23h12.6L16,10.4L9.7,23z M16.5,19.8h-1v-5.4h1V19.8z M16.5,20.8v1.1h-1v-1.1H16.5z",
                        "fill": "#E81123",
                        "stroke": "transparent",
                        "stroke-width": "5",
                        "class": "warning-icon",
                        "transform": iconScaleTransform
                    })
                        .classed(this.sizeCssClass, true);
                    var warningTitle = warning.title;
                    warningTitle
                        .text(this.data.warningTooltipText);
                    // move title over to account for icon
                    chartTitleElement.attr("transform", "translate(" + (iconWidth + 6) + ",0)");
                    warning.group.on("touchstart", function () { return _this.showMobileTooltip(_this.data.warningTooltipText); });
                };
                DualKpi.prototype.createInfoMessage = function (iconY, iconScaleTransform, iconWidth, chartWidth, dataDaysOld) {
                    var _this = this;
                    var infoMessage = "Data is " + dataDaysOld + " days old. " + this.data.staleDataTooltipText;
                    var info = this.bottomContainer.info;
                    info.group
                        .attr("transform", "translate(" + (chartWidth - iconWidth - 8) + "," + (iconY) + ")");
                    var infoIcon = info.icon;
                    infoIcon
                        .attr({
                        "d": "M24,16c0,1.4-0.4,2.8-1,4c-0.7,1.2-1.7,2.2-2.9,2.9c-1.2,0.7-2.5,1-4,1s-2.8-0.4-4-1c-1.2-0.7-2.2-1.7-2.9-2.9 C8.4,18.8,8,17.4,8,16c0-1.5,0.4-2.8,1.1-4c0.8-1.2,1.7-2.2,2.9-2.9S14.6,8,16,8s2.8,0.3,4,1.1c1.2,0.7,2.2,1.7,2.9,2.9 C23.6,13.2,24,14.5,24,16z M12.6,22c1.1,0.6,2.2 0.9,3.4,0.9s2.4-0.3,3.5-0.9c1-0.6,1.9-1.5,2.5-2.6c0.6-1,1-2.2,1-3.4 s-0.3-2.4-1-3.5s-1.5-1.9-2.5-2.5c-1.1-0.6-2.2-1-3.5-1s-2.4,0.4-3.4,1c-1.1,0.6-1.9,1.4-2.6,2.5c-0.6,1.1-0.9,2.2-0.9,3.5 c0,1.2,0.3,2.4,0.9,3.4C10.6,20.5,11.4,21.4,12.6,22z M16.5,17.6h-1v-5.4h1V17.6z M16.5 19.7h-1v-1.1h1V19.7z",
                        "fill": "#3599B8",
                        "stroke": "transparent",
                        "stroke-width": "5",
                        "class": "info-icon",
                        "transform": iconScaleTransform
                    })
                        .classed(this.sizeCssClass, true)
                        .classed("hidden", false);
                    var infoTitle = info.title;
                    infoTitle
                        .text(infoMessage);
                    info.group.on("touchstart", function () { return _this.showMobileTooltip(infoMessage); });
                };
                DualKpi.prototype.hideInfoMessage = function () {
                    var info = this.bottomContainer.info;
                    info.icon.classed("hidden", true);
                };
                DualKpi.prototype.drawChart = function (options) {
                    var _this = this;
                    var chartData = options.chartData;
                    var axisConfig = options.axisConfig;
                    var latestValue = chartData[chartData.length - 1].value, isTopChart = options.position === DualKpiChartPositionType.top, dataColor = isTopChart ? this.data.dataColorTop : this.data.dataColorBottom, chartOpacity = isTopChart ? this.data.opacityTop : this.data.opacityBottom;
                    var target = this.target[0];
                    var targetPadding = parseInt(this.target.css("padding-left"), 10) || 0;
                    var margin = {
                        top: 7,
                        right: 0,
                        bottom: 0,
                        left: this.chartLeftMargin
                    };
                    if (this.size === DualKpiSize.medium || this.size === DualKpiSize.large) {
                        margin.left = 40;
                    }
                    var calcWidth = options.width - margin.right - margin.left, calcHeight = options.height - margin.top - margin.bottom, minValue = d3.min(chartData, function (d) { return d.value; }) || 0, maxValue = d3.max(chartData, function (d) { return d.value; }) || 0;
                    var axisMinValue = axisConfig.min !== null ? axisConfig.min : minValue;
                    var axisMaxValue = axisConfig.max !== null ? axisConfig.max : maxValue;
                    var xScale = d3.time.scale()
                        .domain(d3.extent(chartData, function (d) { return d.date; }))
                        .range([0, calcWidth]);
                    var yScale = d3.scale.linear()
                        .domain([axisMinValue, axisMaxValue])
                        .clamp(true)
                        .range([calcHeight, 0]);
                    var yAxis = d3.svg.axis()
                        .scale(yScale)
                        .tickValues([axisMinValue, axisMaxValue])
                        .tickFormat(function (d) {
                        var axisTickLabel = String(_this.axisNumberFormatter(d));
                        if (options.valueAsPercent) {
                            axisTickLabel = axisTickLabel + "%";
                        }
                        return axisTickLabel;
                    })
                        .orient("left");
                    var seriesRenderer, fill, stroke, strokeWidth;
                    if (options.chartType === "area") {
                        seriesRenderer = d3.svg.area()
                            .x(function (d) { return xScale(d.date || new Date()); })
                            .y0(calcHeight)
                            .y1(function (d) { return yScale(d.value || 0); });
                        fill = dataColor;
                        stroke = "none";
                        strokeWidth = 0;
                    }
                    else {
                        seriesRenderer = d3.svg.line()
                            .x(function (d) { return xScale(d.date || new Date()); })
                            .y(function (d) { return yScale(d.value || 0); });
                        fill = "none";
                        stroke = dataColor;
                        strokeWidth = 2;
                    }
                    var chartGroup = options.element;
                    chartGroup.group
                        .attr("transform", "translate(" + margin.left + "," + (options.top + margin.top) + ")");
                    var chartArea = chartGroup.area;
                    chartArea
                        .datum(chartData)
                        .attr({
                        "style": "opacity: " + (chartOpacity / 100),
                        "fill": fill,
                        "stroke": stroke,
                        "stroke-width": strokeWidth,
                        "d": seriesRenderer
                    });
                    var zeroAxis = chartGroup.zeroAxis;
                    var zeroPointOnAxis = axisMinValue <= 0 && axisMaxValue >= 0 ? true : false;
                    // DRAW line for x axis at zero position
                    // if formatting option for zero line set to true
                    // and if a value of zero is on the y-axis
                    if (options.showZeroLine && zeroPointOnAxis) {
                        var axisLine = d3.svg.line()
                            .x(function (d) { return xScale(d.date); })
                            .y(function (d) { return yScale(0); });
                        zeroAxis
                            .datum(chartData)
                            .classed("hidden", false)
                            .attr({
                            "d": axisLine
                        });
                    }
                    else {
                        zeroAxis
                            .classed("hidden", true);
                    }
                    var axis = chartGroup.yAxis;
                    axis
                        .attr("class", "axis")
                        .classed(this.sizeCssClass, true)
                        .call(yAxis);
                    /* Add elements for hover behavior ******************************************************/
                    var hoverLine = chartGroup.hoverLine;
                    hoverLine
                        .classed("invisible", true)
                        .attr({
                        "x1": 0,
                        "x2": 0,
                        "y1": 0,
                        "y2": calcHeight,
                        "stroke-width": 1,
                        "stroke": "#777"
                    });
                    var chartBottom = margin.top + calcHeight;
                    var chartLeft = margin.left;
                    var hoverDataContainer = options.element.hoverDataContainer;
                    this.updateHoverDataContainer(hoverDataContainer, chartBottom, chartLeft, calcWidth, isTopChart);
                    this.dispatch.on("onDualKpiMouseMove." + options.position, function (_a) {
                        var leftPosition = _a[0], topPosition = _a[1];
                        var areaScale = DualKpi.getScale(target);
                        var maxWidth = options.width - margin.left;
                        leftPosition = leftPosition / areaScale.x - margin.left - targetPadding;
                        var x = xScale.invert(leftPosition);
                        var i = _this.dataBisector(chartData, x, 1);
                        var dataPoint = chartData[i];
                        if ((leftPosition > 0) &&
                            (topPosition > 0) &&
                            (leftPosition < maxWidth) &&
                            (topPosition < (options.height * 2 + 15)) &&
                            dataPoint) {
                            hoverLine.attr("transform", "translate(" + leftPosition + ", 0)");
                            hoverLine.classed("invisible", false);
                            _this.showHoverData(hoverDataContainer, dataPoint, latestValue, options.valueAsPercent, options.abbreviateHoverValue);
                        }
                        else {
                            _this.hideHoverData(hoverDataContainer, hoverLine);
                        }
                    });
                    this.dispatch.on("onDualKpiMouseOut." + options.position, function () {
                        _this.hideHoverData(hoverDataContainer, hoverLine);
                    });
                    if (options.showTextOverlay) {
                        this.addOverlayText(options, latestValue, calcHeight, calcWidth, isTopChart);
                    }
                    else {
                        options.element.chartOverlay.rect.classed("invisible", true);
                        options.element.chartOverlay.title.classed("invisible", true);
                        options.element.chartOverlay.text.classed("invisible", true);
                    }
                };
                DualKpi.getScale = function (element) {
                    var clientRect = element.getBoundingClientRect();
                    return {
                        x: clientRect.width / element.offsetWidth,
                        y: clientRect.height / element.offsetHeight
                    };
                };
                DualKpi.prototype.addOverlayText = function (options, latestValue, calcHeight, calcWidth, isTopChart) {
                    var _this = this;
                    var textColor = isTopChart ? this.data.textColorTop : this.data.textColorBottom;
                    var chartData = options.chartData;
                    var chartGroup = options.element;
                    var percentChange = DualKpi.getPercentChange(options.percentChangeStartPoint.value, chartData[chartData.length - 1].value);
                    var formattedValue;
                    if (options.showDefaultTextOverlay) {
                        formattedValue = options.defaultTextOverlay;
                    }
                    else {
                        formattedValue = options.abbreviateValue ? this.valueFormatter(latestValue) : this.commaNumberFormatter(Math.round(latestValue));
                    }
                    if (options.valueAsPercent) {
                        formattedValue = DualKpi.percentFormatter(latestValue);
                        // if value is a percent, only show difference changed, not percent of percent
                        percentChange = DualKpi.percentFormatter(chartData[chartData.length - 1].value - options.percentChangeStartPoint.value, true);
                    }
                    var chartOverlay = chartGroup.chartOverlay;
                    var dataTitle = chartOverlay.title;
                    dataTitle
                        .classed("invisible", true)
                        .attr("class", "data-title")
                        .classed(this.sizeCssClass, true)
                        .attr("fill", textColor)
                        .text(options.showDefaultTextOverlay ? "" : options.chartTitle + " (" + percentChange + ")");
                    var dataValue = chartOverlay.text;
                    dataValue
                        .classed("invisible", true)
                        .attr("class", "data-value")
                        .classed(this.sizeCssClass, true)
                        .attr("fill", textColor)
                        .text(formattedValue);
                    var dataTitleHorzCentering = calcWidth / 2;
                    var dataValueHorzCentering = calcWidth / 2;
                    var verticalMargin = DualKpi.DefaultValueSizes[this.sizeCssClass];
                    // apply centerings, then unhide text
                    dataTitle.attr("transform", "translate(" + dataTitleHorzCentering + ", 0)");
                    dataValue.attr("transform", "translate(" + dataValueHorzCentering + ", " + verticalMargin + ")");
                    var verticalCentering = (calcHeight / 2) - verticalMargin / 2; // bump slightly above perfectly vertically centered on chart
                    var horizontalCentering = 0;
                    chartOverlay.group
                        .attr("transform", "translate(" + horizontalCentering + ", " + verticalCentering + ")");
                    dataTitle.classed("invisible", false);
                    dataValue.classed("invisible", false);
                    // set rect dimensions
                    // add rect to overlay section so that tooltip shows up more easily
                    var overlayRect = chartOverlay.rect;
                    // add tooltip
                    var percentChangeDesc = percentChange;
                    if (!this.data.shortKpiTooltip) {
                        percentChangeDesc += " change since " + this.timeFormatter(options.percentChangeStartPoint.date);
                    }
                    var overlayTooltipText;
                    if (options.showDefaultTextOverlay) {
                        overlayTooltipText = formattedValue;
                    }
                    else {
                        overlayTooltipText = options.tooltipText + " " + percentChangeDesc;
                    }
                    var overlayTooltip = chartOverlay.rectTitle;
                    overlayTooltip
                        .text(overlayTooltipText);
                    var dataTitleProps = textMeasurementService.getSvgMeasurementProperties(dataTitle.node());
                    var dataValueProps = textMeasurementService.getSvgMeasurementProperties(dataValue.node());
                    var dataTitleWidth = textMeasurementService.measureSvgTextWidth(dataTitleProps);
                    var dataTitleHeight = textMeasurementService.measureSvgTextHeight(dataTitleProps);
                    var dataValueWidth = textMeasurementService.measureSvgTextWidth(dataValueProps);
                    var dataValueHeight = textMeasurementService.measureSvgTextHeight(dataValueProps);
                    var dataWidth = Math.max(dataTitleWidth, dataValueWidth);
                    var dataHeight = dataTitleHeight + dataValueHeight + (verticalMargin);
                    overlayRect
                        .attr("width", dataWidth)
                        .attr("height", dataHeight)
                        .attr("transform", "translate(" + (dataTitleHorzCentering - (dataWidth / 2)) + "," + (-dataValueHeight) + ")");
                    overlayRect.on("touchstart", function () { return _this.showMobileTooltip(overlayTooltipText); });
                    overlayRect.on("mousemove", function () {
                        if (_this.touchEventsEnabled) {
                            d3.event.stopPropagation();
                        }
                    });
                };
                return DualKpi;
            }()); /*close IVisual*/
            DualKpi.capabilities = {
                dataRoles: [
                    {
                        displayName: "Axis",
                        name: "axis",
                        kind: powerbi.VisualDataRoleKind.Grouping
                    },
                    {
                        displayName: "Top values",
                        name: "topvalues",
                        kind: powerbi.VisualDataRoleKind.Measure,
                        requiredTypes: [{
                                "numeric": true
                            }, {
                                "integer": true
                            }]
                    },
                    {
                        displayName: "Bottom values",
                        name: "bottomvalues",
                        kind: powerbi.VisualDataRoleKind.Measure,
                        requiredTypes: [{
                                "numeric": true
                            }, {
                                "integer": true
                            }]
                    },
                    {
                        displayName: "Warning state",
                        name: "warningstate",
                        kind: powerbi.VisualDataRoleKind.Measure
                    },
                    {
                        displayName: "Top - % change start date",
                        name: "toppercentdate",
                        kind: powerbi.VisualDataRoleKind.Grouping
                    },
                    {
                        displayName: "Bottom - % change start date",
                        name: "bottompercentdate",
                        kind: powerbi.VisualDataRoleKind.Grouping
                    },
                ],
                dataViewMappings: [{
                        conditions: [
                            {
                                "axis": { max: 1 },
                                "topvalues": { max: 1 },
                                "bottomvalues": { max: 1 },
                                "warningstate": { max: 1 },
                                "toppercentdate": { max: 1 },
                                "bottompercentdate": { max: 1 }
                            }
                        ],
                        table: {
                            rows: {
                                for: {
                                    in: "axis"
                                },
                                dataReductionAlgorithm: { top: { count: 1000 } }
                            }
                        },
                        categorical: {
                            categories: {
                                select: [
                                    { for: { in: "axis" } },
                                ],
                                dataReductionAlgorithm: { top: { count: 1000 } }
                            },
                            values: {
                                select: [{
                                        bind: {
                                            to: "axis"
                                        }
                                    }, {
                                        bind: {
                                            to: "topvalues"
                                        }
                                    }, {
                                        bind: {
                                            to: "bottomvalues"
                                        }
                                    }, {
                                        bind: {
                                            to: "warningstate"
                                        }
                                    }, {
                                        bind: {
                                            to: "toppercentdate"
                                        }
                                    }, {
                                        bind: {
                                            to: "bottompercentdate"
                                        }
                                    }]
                            }
                        },
                    }],
                objects: {
                    "dualKpiProperties": {
                        "displayName": "Dual KPI Properties",
                        "properties": {
                            "titleText": {
                                "displayName": "Title text",
                                "type": {
                                    "text": true
                                }
                            },
                            "abbreviateValues": {
                                "displayName": "Abbreviate values",
                                "type": {
                                    "bool": true
                                }
                            },
                            "abbreviateHoverValues": {
                                "displayName": "Abbreviate hover values only",
                                "type": {
                                    "bool": true
                                }
                            },
                            "shortKpiTooltip": {
                                "displayName": "Short KPI tooltip",
                                "type": {
                                    "bool": true
                                }
                            },
                            "topChartToolTipText": {
                                "displayName": "Top chart tooltip text",
                                "type": {
                                    "text": true
                                }
                            },
                            "bottomChartToolTipText": {
                                "displayName": "Bottom chart tooltip text",
                                "type": {
                                    "text": true
                                }
                            },
                            "warningTooltipText": {
                                "displayName": "Warning tooltip text",
                                "type": {
                                    "text": true
                                }
                            },
                            "showStaleDataWarning": {
                                "displayName": "Show stale data warning",
                                "type": {
                                    "bool": true
                                }
                            },
                            "staleDataTooltipText": {
                                "displayName": "Stale data tooltip text",
                                "type": {
                                    "text": true
                                }
                            },
                            "staleDataThreshold": {
                                "displayName": "Stale data threshold",
                                "type": {
                                    "numeric": true
                                }
                            },
                            "topPercentCalcDate": {
                                "displayName": "Top - % change start date (mm/dd/yyyy)",
                                "type": {
                                    "text": true
                                }
                            },
                            "bottomPercentCalcDate": {
                                "displayName": "Bottom - % change start date (mm/dd/yyyy)",
                                "type": {
                                    "text": true
                                }
                            }
                        }
                    },
                    "dualKpiValues": {
                        "displayName": "Dual KPI Values",
                        "properties": {
                            "show": {
                                "type": {
                                    "bool": true
                                }
                            },
                            "showKpiValuesTop": {
                                "displayName": "Show top chart KPI values",
                                "type": {
                                    "bool": true
                                }
                            },
                            "topChartDefaultKpiValue": {
                                "displayName": "Top chart default KPI text",
                                "type": {
                                    "text": true
                                }
                            },
                            "showKpiValuesBottom": {
                                "displayName": "Show bottom chart KPI values",
                                "type": {
                                    "bool": true
                                }
                            },
                            "bottomChartDefaultKpiValue": {
                                "displayName": "Bottom chart default KPI text",
                                "type": {
                                    "text": true
                                }
                            }
                        }
                    },
                    "dualKpiColors": {
                        "displayName": "Dual KPI Top Chart Colors",
                        "properties": {
                            "dataColor": {
                                "displayName": "Data color",
                                "type": {
                                    "fill": {
                                        "solid": {
                                            "color": true
                                        }
                                    }
                                }
                            },
                            "textColor": {
                                "displayName": "Text color",
                                "type": {
                                    "fill": {
                                        "solid": {
                                            "color": true
                                        }
                                    }
                                }
                            },
                            "opacity": {
                                "displayName": "Chart opacity",
                                "type": {
                                    "numeric": true
                                }
                            }
                        }
                    },
                    "dualKpiColorsBottom": {
                        "displayName": "Dual KPI Bottom Chart Colors",
                        "properties": {
                            "matchTopChartOptions": {
                                "displayName": "Match top chart settings",
                                "type": {
                                    "bool": true
                                }
                            },
                            "dataColor": {
                                "displayName": "Data color",
                                "type": {
                                    "fill": {
                                        "solid": {
                                            "color": true
                                        }
                                    }
                                }
                            },
                            "textColor": {
                                "displayName": "Text color",
                                "type": {
                                    "fill": {
                                        "solid": {
                                            "color": true
                                        }
                                    }
                                }
                            },
                            "opacity": {
                                "displayName": "Chart opacity",
                                "type": {
                                    "numeric": true
                                }
                            }
                        }
                    },
                    "dualKpiAxis": {
                        "displayName": "Dual KPI Axis Settings",
                        "properties": {
                            "topChartAxisMin": {
                                "displayName": "Top chart axis min",
                                "type": {
                                    "numeric": true
                                }
                            },
                            "topChartAxisMax": {
                                "displayName": "Top chart axis max",
                                "type": {
                                    "numeric": true
                                }
                            },
                            "bottomChartAxisMin": {
                                "displayName": "Bottom chart axis min",
                                "type": {
                                    "numeric": true
                                }
                            },
                            "bottomChartAxisMax": {
                                "displayName": "Bottom chart axis max",
                                "type": {
                                    "numeric": true
                                }
                            },
                            "topChartZeroLine": {
                                "displayName": "Top chart zero line",
                                "type": {
                                    "bool": true
                                }
                            },
                            "bottomChartZeroLine": {
                                "displayName": "Bottom chart zero line",
                                "type": {
                                    "bool": true
                                }
                            }
                        }
                    },
                    "dualKpiChart": {
                        "displayName": "Dual KPI Chart Type",
                        "properties": {
                            "topChartType": {
                                "displayName": "Top chart type",
                                "type": { "enumeration": DualKpiChartType.type }
                            },
                            "bottomChartType": {
                                "displayName": "Bottom chart type",
                                "type": { "enumeration": DualKpiChartType.type }
                            }
                        }
                    }
                }
            };
            DualKpi.defaultValues = {
                titleText: "Title",
                abbreviateValues: false,
                abbreviateHoverValues: false,
                shortKpiTooltip: false,
                showKpiValues: true,
                showKpiValuesTop: true,
                showKpiValuesBottom: true,
                topChartDefaultKpiValue: "N/A",
                bottomChartDefaultKpiValue: "N/A",
                matchTopChartOptions: true,
                topChartToolTipText: "",
                bottomChartToolTipText: "",
                warningTooltipText: "Warning message",
                showStaleDataWarning: true,
                staleDataTooltipText: "",
                staleDataThreshold: 2,
                topPercentCalcDate: null,
                bottomPercentCalcDate: null,
                dataColor: "#01b8aa",
                textColor: "#212121",
                opacity: 30,
                topChartAxisMin: null,
                topChartAxisMax: null,
                bottomChartAxisMin: null,
                bottomChartAxisMax: null,
                topChartZeroLine: false,
                bottomChartZeroLine: false,
                topChartType: "area",
                bottomChartType: "area"
            };
            DualKpi.properties = {
                titleText: { objectName: "dualKpiProperties", propertyName: "titleText" },
                abbreviateValues: { objectName: "dualKpiProperties", propertyName: "abbreviateValues" },
                abbreviateHoverValues: { objectName: "dualKpiProperties", propertyName: "abbreviateHoverValues" },
                shortKpiTooltip: { objectName: "dualKpiProperties", propertyName: "shortKpiTooltip" },
                showKpiValues: { objectName: "dualKpiValues", propertyName: "show" },
                showKpiValuesTop: { objectName: "dualKpiValues", propertyName: "showKpiValuesTop" },
                showKpiValuesBottom: { objectName: "dualKpiValues", propertyName: "showKpiValuesBottom" },
                topChartDefaultKpiValue: { objectName: "dualKpiValues", propertyName: "topChartDefaultKpiValue" },
                bottomChartDefaultKpiValue: { objectName: "dualKpiValues", propertyName: "bottomChartDefaultKpiValue" },
                topChartToolTipText: { objectName: "dualKpiProperties", propertyName: "topChartToolTipText" },
                bottomChartToolTipText: { objectName: "dualKpiProperties", propertyName: "bottomChartToolTipText" },
                warningTooltipText: { objectName: "dualKpiProperties", propertyName: "warningTooltipText" },
                showStaleDataWarning: { objectName: "dualKpiProperties", propertyName: "showStaleDataWarning" },
                staleDataTooltipText: { objectName: "dualKpiProperties", propertyName: "staleDataTooltipText" },
                staleDataThreshold: { objectName: "dualKpiProperties", propertyName: "staleDataThreshold" },
                topPercentCalcDate: { objectName: "dualKpiProperties", propertyName: "topPercentCalcDate" },
                bottomPercentCalcDate: { objectName: "dualKpiProperties", propertyName: "bottomPercentCalcDate" },
                dataColorTop: { objectName: "dualKpiColors", propertyName: "dataColor" },
                textColorTop: { objectName: "dualKpiColors", propertyName: "textColor" },
                opacityTop: { objectName: "dualKpiColors", propertyName: "opacity" },
                dataColorBottom: { objectName: "dualKpiColorsBottom", propertyName: "dataColor" },
                matchTopChartOptions: { objectName: "dualKpiColorsBottom", propertyName: "matchTopChartOptions" },
                textColorBottom: { objectName: "dualKpiColorsBottom", propertyName: "textColor" },
                opacityBottom: { objectName: "dualKpiColorsBottom", propertyName: "opacity" },
                topChartAxisMin: { objectName: "dualKpiAxis", propertyName: "topChartAxisMin" },
                topChartAxisMax: { objectName: "dualKpiAxis", propertyName: "topChartAxisMax" },
                bottomChartAxisMin: { objectName: "dualKpiAxis", propertyName: "bottomChartAxisMin" },
                bottomChartAxisMax: { objectName: "dualKpiAxis", propertyName: "bottomChartAxisMax" },
                topChartZeroLine: { objectName: "dualKpiAxis", propertyName: "topChartZeroLine" },
                bottomChartZeroLine: { objectName: "dualKpiAxis", propertyName: "bottomChartZeroLine" },
                topChartType: { objectName: "dualKpiChart", propertyName: "topChartType" },
                bottomChartType: { objectName: "dualKpiChart", propertyName: "bottomChartType" }
            };
            DualKpi.DefaultTitleSizes = {
                "super-small": 10,
                "extra-small": 11,
                "small": 12,
                "medium": 14,
                "large": 16
            };
            DualKpi.DefaultValueSizes = {
                "super-small": 14,
                "extra-small": 18,
                "small": 26,
                "medium": 32,
                "large": 40
            };
            DualKpi.OPACITY_MIN = 0;
            DualKpi.OPACITY_MAX = 100;
            PBI_CV_3C80B1F2_09AF_4123_8E99_C3CBC46B23E0.DualKpi = DualKpi;
        })(PBI_CV_3C80B1F2_09AF_4123_8E99_C3CBC46B23E0 = visuals.PBI_CV_3C80B1F2_09AF_4123_8E99_C3CBC46B23E0 || (visuals.PBI_CV_3C80B1F2_09AF_4123_8E99_C3CBC46B23E0 = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {})); /*close export*/
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var plugins;
        (function (plugins) {
            plugins.PBI_CV_3C80B1F2_09AF_4123_8E99_C3CBC46B23E0 = {
                name: 'PBI_CV_3C80B1F2_09AF_4123_8E99_C3CBC46B23E0',
                class: 'PBI_CV_3C80B1F2_09AF_4123_8E99_C3CBC46B23E0',
                capabilities: powerbi.visuals.PBI_CV_3C80B1F2_09AF_4123_8E99_C3CBC46B23E0.DualKpi.capabilities,
                custom: true,
                create: function () { return new powerbi.visuals.PBI_CV_3C80B1F2_09AF_4123_8E99_C3CBC46B23E0.DualKpi(); }
            };
        })(plugins = visuals.plugins || (visuals.plugins = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
