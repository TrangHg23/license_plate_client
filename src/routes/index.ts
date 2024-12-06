import Home from "../pages/Home";
import ImageProcessing from "../pages/ImageProcessing";


interface RouteType {
    path: string;
    component: React.ComponentType<any>;
    layout?: React.ComponentType<any> | null;
}

export const allRoutes: RouteType[] = [
    { path: '/', component: Home },
    { path: '/uploaded', component: ImageProcessing }

]

