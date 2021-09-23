import { Table, Typography } from "antd";
import { VariableSizeGrid as Grid } from 'react-window';
import { useEffect, useRef, useState } from "react";
import cx from 'classnames'
import { MatchViewProps } from "./types";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

function VirtualTable(props: Parameters<typeof Table>[0]) {
    const { columns, scroll } = props;
    const tableWidth = 0;
  
    const widthColumnCount = columns!.filter(({ width }) => !width).length;
    const mergedColumns = columns!.map(column => {
      if (column.width) {
        return column;
      }
  
      return {
        ...column,
        width: Math.floor(tableWidth / widthColumnCount),
      };
    });
  
    const gridRef = useRef<any>();
    const [connectObject] = useState<any>(() => {
      const obj = {};
      Object.defineProperty(obj, 'scrollLeft', {
        get: () => null,
        set: (scrollLeft: number) => {
          if (gridRef.current) {
            gridRef.current.scrollTo({ scrollLeft });
          }
        },
      });
  
      return obj;
    });
  
    const resetVirtualGrid = () => {
        if (!gridRef.current) return
        gridRef.current.resetAfterIndices({
            columnIndex: 0,
            shouldForceUpdate: true,
        });
    };
  
    useEffect(() => resetVirtualGrid, [tableWidth]);
  
    const renderVirtualList = (rawData: readonly object[], { scrollbarSize, ref, onScroll }: any) => {
      ref.current = connectObject;
      const totalHeight = rawData.length * 54;
  
      return (
        <Grid
          ref={gridRef}
          className="virtual-grid"
          columnCount={mergedColumns.length}
          columnWidth={(index: number) => {
            const { width } = mergedColumns[index];
            return totalHeight > scroll!.y! && index === mergedColumns.length - 1
              ? (width as number) - scrollbarSize - 1
              : (width as number);
          }}
          height={scroll!.y as number}
          rowCount={rawData.length}
          rowHeight={() => 54}
          width={tableWidth}
          onScroll={({ scrollLeft }: { scrollLeft: number }) => {
            onScroll({ scrollLeft });
          }}
        >
          {({
            columnIndex,
            rowIndex,
            style,
          }: {
            columnIndex: number;
            rowIndex: number;
            style: React.CSSProperties;
          }) => (
            <div
              className={cx('virtual-table-cell', {
                'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
              })}
              style={style}
            >
              {(rawData[rowIndex] as any)[(mergedColumns as any)[columnIndex].dataIndex]}
            </div>
          )}
        </Grid>
      );
    };
  
    return (
        <Table
            {...props}
            rowKey="key"
            className="virtual-table"
            columns={mergedColumns}
            pagination={false}
            components={{
                body: renderVirtualList,
            }}
        />
    );
  }

const columns = [
    {
      title: "Product",
      dataIndex: "product_id", 
      key: "product_id"
    },
    {
      title: "Transaction At",
      dataIndex: "timestamp", 
      key: "timestamp"
    },
    {
      title: "Price",
      dataIndex: "side_price", 
      key: "side_price",
      render: ([side, price]: string[]) => <Text type={side === "buy" ? "danger": "success"}>{price}</Text>
    },
    {
      title: "Quantity",
      dataIndex: "size", 
      key: "size"
    },
]

export const MatchView = ({ matches } : MatchViewProps) => {
    const { t } = useTranslation();

    return (
      <>
        {(matches.length > 0) && (
          <>
            <Title level={4} className="text-center title-spacing pb-0">{t('priceview.matches')}</Title>
            <VirtualTable columns={columns} dataSource={matches.map(m => ({...m, side_price: [m.side, m.price]}))} className="mt-2"/>
          </>
        )}
      </>
    )
}