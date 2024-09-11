import { ReactNode } from "react";

type GridComponentProps = {
    children: ReactNode;
    layout: number
}
const GridComponent:React.FC<GridComponentProps> = ({children, layout = 2}) => {
    return (
        <div>{children}</div>
    )
}

export default GridComponent;