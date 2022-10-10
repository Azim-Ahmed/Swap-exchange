import { Button, Typography } from '@material-ui/core'
import { AddCircle } from '@material-ui/icons';

const SecondCard = (props) => {
    const { titleVariant, titleColor, buttonText, children, categorySection } = props
    return (
        <div style={{
            minHeight: "890px",
            margin: '0px 20px 298px 9px',
            borderRadius: '6px',
            boxShadow: '-1px 4px 8px 0 rgba(0, 0, 0, 0.36)',
            backgroundColor: '#fff',
            height: "100%"
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant={titleVariant} color={titleColor}></Typography>
                {
                    buttonText && <Button
                        color="primary"
                        style={{ textAlign: 'center' }}
                        startIcon={
                            <AddCircle />
                        }
                        variant="outlined"
                    >{buttonText}</Button>
                }

            </div>
            <p style={{ color: 'black' }}>{categorySection}</p>
            {children}
        </div >
    )
}
export default SecondCard;