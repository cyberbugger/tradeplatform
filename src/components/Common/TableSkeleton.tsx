import { Typography } from "antd"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { TableSkeletonProps } from "../MarketPlatform/types"

const { Title } = Typography;

export const TableSkeleton = ({ title, rowCount } : TableSkeletonProps) => {

    const getColumns = (colCount:number = 4) => {
        const tempList = [];

        for(let i=0; i<colCount; i++){
            tempList.push(
                <Skeleton 
                    key={`skele-col-${i}`}
                    style={{ width: '24%', margin: '10px 0.5%' }}
                    count={rowCount}
                />
            )
        }

        return tempList;
    }

    return(
        <div className="mt-2 pb-2">
            {title && (<Title level={4} className="text-center title-spacing pb-0 ">{title}</Title>)}
            <SkeletonTheme color="#cac7c7" highlightColor="#d8d4d4">
                {getColumns()}
            </SkeletonTheme>
        </div>
    )
}