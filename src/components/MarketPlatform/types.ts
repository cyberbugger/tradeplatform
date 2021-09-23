import { PresetStatusColorType } from "antd/lib/_util/colors"

export type SystemStatusProps = {
    message: string
    status: PresetStatusColorType
}

export type TableSkeletonProps = {
    title: string | undefined | null
    rowCount: number
}

type OrderType = "buy" | "sell"

export type Match = {
    key: number
    product_id: string
    price: string
    size: string
    timestamp: string
    side: OrderType
}

export type MarketHeaderProps = {
    product: string | undefined
    onSelectProduct: (product: string | undefined) => void
    isDisabled: boolean
}

export type MatchViewWrapperProps = {
    matches: Match[]
    product: string | undefined
    isDisabled: boolean
}

export type PriceViewWrapperProps = {
    product: string | undefined
    isDisabled: boolean
    bids: string[][]
    asks: string[][]
}