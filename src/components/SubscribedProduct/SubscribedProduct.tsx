import { DownOutlined } from "@ant-design/icons";
import { Menu, Switch, Dropdown, Space, Button } from "antd";
import { useTranslation } from "react-i18next";
import { SubscribedProductProps } from "../MarketPlatform/types";

export const SubscribedProduct = ({availableProducts, selectedProduct, onSelectProduct} : SubscribedProductProps) => {
    const { t } = useTranslation();

    const menu = (
        <Menu activeKey={selectedProduct} onClick={e => onSelectProduct(e.key)}>
            {availableProducts.map(p => <Menu.Item key={p}>{p}</Menu.Item>)}
        </Menu>
    );

    return (
        <Space direction="vertical">
            {selectedProduct ?
                <Space direction="horizontal">
                    <span>{selectedProduct}</span>
                    <Switch checked={true} onChange={() => onSelectProduct(undefined)} />
                </Space>
                : null
            }
            <Dropdown.Button overlay={menu} placement="bottomCenter" icon={<DownOutlined />}>
                {selectedProduct ? selectedProduct : t('dropdown.select')}
            </Dropdown.Button>
            {selectedProduct ?
                <Button type="link" onClick={() => onSelectProduct(undefined)}>
                    {t('dropdown.clear')}
                </Button>
                : null
            }
        </Space>
    )
}