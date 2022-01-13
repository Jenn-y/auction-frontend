import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { useState } from "react";

import AuthService from "services/AuthService";

const SettingsSection = (props: any) => {
	const [openDialog, setOpenDialog] = useState(false);
	const [user, setUser] = useState()

	const onDeactivateButtonClick = () => {
        setOpenDialog(true);
    };

    const onDialogClose = () => {
        setOpenDialog(false);
    }

	const onDeactivateAccountClick = () => {
		AuthService.getUserById(props.user.id, props.user.authenticationToken)
			.then(response => {
				if (response) {
					setUser(response)
				}
			})

		AuthService.deactivate(props.user.id, user, props.user.authenticationToken)
			.then(() => {
				AuthService.logout()
				window.location.replace("/login")
			})
	}
	
    return (
        <div className="settings">
			<div className="row">
				<div className="col-12 col-sm-6 col-lg tabs">
					<table className="table">
						<thead>
							<tr>
								<th>Policy and Community</th>
							</tr>
						</thead>
						<tbody>
							<td>
								<p>Receive updates on bids and seller's offers. Stay informed through:</p>
								<div className="info-check"><input type="checkbox" name="email" />
								<label htmlFor="email">Email</label></div>
								<div className="info-check"><input type="checkbox" name="push" />
								<label htmlFor="push">Push Notifications</label></div>
							</td>
						</tbody>
					</table>
				</div>
				<div className="col-12 col-sm-6 col-lg tabs">
					<table className="table">
						<thead>
							<tr>
								<th>Contact Information</th>
							</tr>
						</thead>
						<tbody>
							<td>
								<p>This information can be edited on your profile:</p>
								<p>Email: <span>adam.smith@gmail.com</span></p>
								<p>Phone <span>555-555-555</span></p>
							</td>
						</tbody>
					</table>
				</div>
			</div>
			<div className="row">
				<div className="col-12 col-sm-6 col-lg account">
					<table className="table">
						<thead>
							<tr>
								<th>Account</th>
							</tr>
						</thead>
						<tbody>
							<td>
								<p>Do you want to deativate account?</p>
								<button className="deactivate-btn" onClick={onDeactivateButtonClick}>DEACTIVATE</button>
								<Dialog
									open={openDialog}
									onClose={onDialogClose}
									aria-labelledby="alert-dialog-title"
									aria-describedby="alert-dialog-description"
								>
									<DialogTitle id="alert-dialog-title">Deactivate Account</DialogTitle>
									<DialogContent>
										<DialogContentText id="alert-dialog-description">
											Are you sure you want to temporarily deactivate your account?
										</DialogContentText>
									</DialogContent>
									<DialogActions>
										<Button onClick={onDialogClose}>NO</Button>
										<Button onClick={onDeactivateAccountClick} autoFocus>YES</Button>
									</DialogActions>
								</Dialog>
							</td>
						</tbody>
					</table>
				</div>
			</div>
		</div>
    );
}

export default SettingsSection
