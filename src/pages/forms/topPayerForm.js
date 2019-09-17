import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {
    Grid,
    CircularProgress,
    TextField,
} from "@material-ui/core";

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function CustomizedDialogs() {
    const [open, setOpen] = React.useState(false);
    var { payer, lives, status, order } = React.useState();

    const onChangePayer = (e) => {
        payer = e.target.value
    }

    const onChangeLives = (e) => {
        lives = e.target.value
    }

    const onChangeLiveStatus = (e) => {
        status = e.target.value
    }

    const onChangeOrder = (e) => {
        order = e.target.value
    }

    const onFormSubmit = () => {
        console.log( payer, lives, status, order );
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
                Add Top Payer
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Top Payer
                </DialogTitle>
                <DialogContent dividers>
                    <Grid>
                        <Typography>Payer</Typography>
                        <TextField
                            id="medicare"
                            value={payer}
                            onChange={onChangePayer}
                            margin="normal"
                            placeholder="Payer"
                            type="text"
                            fullWidth
                        />
                        <Typography>Lives</Typography>
                        <TextField
                            id="live" 
                            value={lives}
                            onChange={onChangeLives}
                            margin="normal"
                            placeholder="Lives( million )"
                            type="number"
                            fullWidth
                        />
                        <Typography>Status (%)</Typography>
                        <TextField
                            id="status"
                            value={status}
                            onChange={onChangeLiveStatus}
                            margin="normal"
                            placeholder="Status"
                            type="number"
                            fullWidth
                        />

                        <Typography>Order</Typography>
                        <TextField
                            id="order"
                            value={order} 
                            onChange={onChangeOrder}
                            margin="normal"
                            placeholder="Order"
                            type="number"
                            max="10" 
                            fullWidth
                        />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onFormSubmit} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}