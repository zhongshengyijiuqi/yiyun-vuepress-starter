import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './styles/reset.css';
import directives from "./components/componentsWeb/directives"

import * as echarts from 'echarts/core';
import {
  LineChart,
  PieChart,
  BarChart,
  CustomChart
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
} from 'echarts/components';
import {
  CanvasRenderer
} from 'echarts/renderers';
echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, LegendComponent, DataZoomComponent, LineChart, PieChart, BarChart, CustomChart, CanvasRenderer]
);

export default ({ Vue, options, router }) => {
  Vue.prototype.$echarts = echarts
  Vue.use(Element);
  Vue.use(directives);
};