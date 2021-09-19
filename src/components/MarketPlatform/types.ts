export type MarketPlatformProps = {
    availableProducts: string[]
}

export type SubscribedProductProps = {
    availableProducts: string[]
    selectedProduct: string | undefined
    onSelectProduct: (product: string | undefined) => void
}