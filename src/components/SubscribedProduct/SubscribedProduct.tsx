import { Button, Row, Select, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { SubscribedProductProps } from "./types";
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    loader: {
        margin: '0 20px'
    }
  })

export const SubscribedProduct = (props : SubscribedProductProps) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const {availableProducts, selectedProduct, onSelectProduct, isDisabled} = props;

    return (
        <Row align="middle">
            <Select 
                placeholder={t('dropdown.select')} 
                style={{ width: 200 }} 
                onChange={onSelectProduct}
                disabled={isDisabled}
                value={selectedProduct}
                data-testid="select-product"
            >
                {availableProducts.map(p => <Select.Option data-testid="select-option" key={p} value={p}>{p}</Select.Option>)}
            </Select>
            {isDisabled && <Spin className={classes.loader}/>}

            {selectedProduct &&
                <Button type="link" data-testid="clear" onClick={() => onSelectProduct(undefined)}>
                    {t('dropdown.clear')}
                </Button>
            }
        </Row>
    )
}