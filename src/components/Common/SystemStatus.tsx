import { Badge } from "antd"
import { SystemStatusProps } from "../MarketPlatform/types"

export const SystemStatus = ({ message, status } : SystemStatusProps) => {

    return <p className="mb-0"><Badge status={status} /> {message}</p>
}