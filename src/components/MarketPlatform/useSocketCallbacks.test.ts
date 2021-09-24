import { useLevelUpdateCallback, useSnapshotCallback } from "./useSocketCallbacks"
import { renderHook, act } from '@testing-library/react-hooks'


const mockBidFn = jest.fn()
const mockAskFn = jest.fn()
const mockUpdateFn = jest.fn()

describe('useSnapshotCallback', () => {
    test('test bids and asks set correctly', () => {
        const { result } = renderHook(() => useSnapshotCallback(mockAskFn, mockBidFn))

        const bids = [...new Array(20)].map((_, i) => i)
        const asks = [...new Array(30)].map((_, i) => i)

        act(() => {
            result.current({ asks, bids })
        })
        
        expect(mockBidFn).toHaveBeenCalledWith([...new Array(10)].map((_, i) => i))
        expect(mockAskFn).toHaveBeenCalledWith([...new Array(10)].map((_, i) => i))
    })
})

describe('useLevelUpdateCallback', () => {
    test('test level updates are consumed correctly', () => {
        const payload = { product_id: 'product_1', changes: [["sell", "1", "0.1"]] } as any
        const socket = { subscribed: 'product_1' }

        const { result } = renderHook(() => useLevelUpdateCallback(mockUpdateFn, socket))
        
        act(() => {
            result.current(payload)
        })
        
        expect(mockUpdateFn).toHaveBeenCalledWith(payload.changes[0])
    })

    test('when quantity in update is 0, update function should not be invoked', () => {
        const payload = { product_id: 'product_1', changes: [["sell", "1", "0"]] } as any
        const socket = { subscribed: 'product_1' }

        const { result } = renderHook(() => useLevelUpdateCallback(mockUpdateFn, socket))
        
        act(() => {
            result.current(payload)
        })
        
        expect(mockUpdateFn).toHaveBeenCalledTimes(0)
    })

    test('when product unsubscribe called but still receiving updates', () => {
        const payload = { product_id: 'product_1', changes: [["sell", "1", "0"]] } as any
        const socket = { subscribed: undefined }

        const { result } = renderHook(() => useLevelUpdateCallback(mockUpdateFn, socket))
        
        act(() => {
            result.current(payload)
        })
        
        expect(mockUpdateFn).toHaveBeenCalledTimes(0)
    })

    test('when product is changed in dropdown, but updates received for different product', () => {
        const payload = { product_id: 'product_1', changes: [["sell", "1", "0"]] } as any
        const socket = { subscribed: 'product_2' }

        const { result } = renderHook(() => useLevelUpdateCallback(mockUpdateFn, socket))
        
        act(() => {
            result.current(payload)
        })
        
        expect(mockUpdateFn).toHaveBeenCalledTimes(0)
    })
})