import { Button, Typography } from '@material-ui/core'
import { AddCircle } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const FirstCard = (props) => {
    const {
        titleVariant,
        titleText,
        description,
        isButton,
        buttonText,
        linkTo,
        linkData,
        children
    } = props
    return (
        <div style={{
            boxShadow: '-9px 0px 9px -4px rgba(229, 229, 229, 0.7), 9px 9px 9px -4px rgba(229, 229, 229, 0.7)',
            borderRadius: '10px',
            marginBottom: '20px',
            marginTop: '20px',
            height: '285px',
            padding: '20px 25px 137px 20px',
            backgroundColor: '#fff',
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                <Typography
                    style={{
                        letterSpacing: '0.18px',
                        fontSize: '24px',
                        color: '#000',
                        fontWeight: 'bold',
                    }}
                    variant={titleVariant}
                    color={"secondary"}
                >{titleText}
                </Typography>
                {
                    linkTo && <Link to={`/${linkTo}`}><Typography>{linkData}</Typography></Link>
                }
            </div>
            <Typography style={{ margin: '30px 0px 0px 0px' }} variant="body2">{description}</Typography>
            {
                isButton && <Button
                    color="primary"
                    style={{ textAlign: 'center' }}
                    startIcon={
                        <AddCircle />
                    }
                    variant="outlined"
                >{buttonText}</Button>
            }
            {children}
        </div>
    )
}
export default FirstCard;