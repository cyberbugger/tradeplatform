import { Col, Row } from "antd"
import { useTranslation } from "react-i18next"
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
    footer: {
        height: '40px',
        marginTop: '50px',
        background: '#001529',
        color: 'white'
    },
})

export const Footer = () => {
    const { t } = useTranslation()
    const classes = useStyles()
    return (
        <Row className={classes.footer} justify="center" align="middle">
            <Col span={20}>
                {t('marketPlatform.copyright')}
            </Col>
        </Row>
    )
}