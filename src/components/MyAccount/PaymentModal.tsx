import { PaymentDetails } from 'interfaces/PaymentDetails'
import { ShippingDetails } from 'interfaces/ShippingDetails'
import { User } from 'interfaces/User'
import moment from 'moment'
import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { MonthPicker, YearPicker } from 'react-dropdown-date'
import AuthService from 'services/AuthService'
import { validateRequiredFields } from 'utils/Validations'

import './PaymentModal.scss';

const PaymentModal = (props: any) =>  {
	const [user, setUser] = useState<User>()
	const [paymentInfo, setPaymentInfo] = useState<PaymentDetails>()
	const [shippingInfo, setShippingInfo] = useState<ShippingDetails>()
	const [errors, setErrors] = useState(false)

	useEffect(() => {
		AuthService.getUserById(props.user.id, props.user.authenticationToken)
		.then(response => {
			if (response) {
				setUser(response)
				setShippingInfo(response.shippingDetails)
				setPaymentInfo(response.paymentDetails)
				setErrors(validateRequiredFields(response.shippingDetails, response.paymentDetails))
			}
		})
	}, [])

	const handleClose = () => {
		props.setOpenModal(false)
	}

	const handleSubmit = (e: any) => {
		e.preventDefault();

		const finalUserData = {
            ...user,
            paymentDetails: paymentInfo,
            shippingDetails: shippingInfo
        }

		console.log(finalUserData)
		handleClose()
	}

	const handleShippingInfoChange = (e: any) => {
		setShippingInfo(Object.assign({}, shippingInfo, { [e.target.name]: e.target.value }))
		setErrors(validateRequiredFields(shippingInfo, paymentInfo))
	}

	const handlePaymentInfoChange = (e: any) => {
		setPaymentInfo(Object.assign({}, paymentInfo, { [e.target.name]: e.target.value }))
		setErrors(validateRequiredFields(shippingInfo, paymentInfo))
	}

	const handlePaypalChange = (paypal: any) => {
		setPaymentInfo(Object.assign({}, paymentInfo, { paypal: paypal }))
		setErrors(validateRequiredFields(shippingInfo, paymentInfo))
	}

	const handleExpirationYearChange = (e: any) => {
		let newDate = new Date()
		newDate.setMonth(getMonth())
		newDate.setFullYear(e)
		setPaymentInfo(Object.assign({}, paymentInfo, { expirationDate: newDate }))
		setErrors(validateRequiredFields(shippingInfo, paymentInfo))
	}

	const handleExpirationMonthChange = (e: any) => {
		let newDate = new Date();
		newDate.setMonth(e)
		newDate.setFullYear(getYear())
		setPaymentInfo(Object.assign({}, paymentInfo, { expirationDate: newDate }))
		setErrors(validateRequiredFields(shippingInfo, paymentInfo))
	}

	const getMonth = () => {
		return Number(moment(paymentInfo?.expirationDate).format("MM")) - 1
	}

	const getYear = () => {
		return Number(moment(paymentInfo?.expirationDate).format("YYYY"))
	}

	return (
	  <Modal size="lg" show={true} onHide={handleClose} contentClassName="payment-modal">
		<form onSubmit={handleSubmit}>
			<Modal.Header closeButton>
			<Modal.Title>Payment Processing</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<table className="table">
					<thead>
						<tr>
							<th>Card Information</th>
						</tr>
					</thead>
					<tbody>
						<td>
							<div className="row">
								<div className="col-12 col-sm-12 col-lg">
									<div className="input_wrap">
										<div className="radio-input">
											<label onClick={() => handlePaypalChange(true)}>
												<input type="radio" checked={paymentInfo?.paypal}></input>
												PayPal
											</label>
										</div>
										<div className="credit-input">
											<div className="radio-input">
												<label onClick={() => handlePaypalChange(false)}>
													<input type="radio" checked={!paymentInfo?.paypal}></input>
													Credit Card
												</label>
											</div>
											<p>We accept the following credit cards:</p>
											<div className="credit-cards">
												<img alt="visa" src="https://labvital.com.br/wp-content/plugins/woocommerce/assets/images/icons/credit-cards/visa.svg"></img>
												<img alt="mastercard" src="https://www.aljoumhouria.com/glide/News/archive/244/243076_mastercard-92.jpg?w=745&h=535&fit=crop"></img>
												<img alt="maestro" src="https://www.neowave.com.my/freegraphics/mastercard/maestro_250.gif"></img>
												<img alt="american" src="https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto,fl_lossy/wp-cms/uploads/sites/4/2018/04/4-you-might-not-notice-amex-new-brand.jpg"></img>
											</div>
										</div>
									</div>
									<div className="input_wrap">
										<label>Name on the card</label>
										<div className="input_field">
											<input onChange={handlePaymentInfoChange} value={paymentInfo?.cardName} name="cardName" type="text" className="input" placeholder="Enter card name" />
										</div>
									</div>
									<div className="input_wrap">
										<label>Card number</label>
										<div className="input_field">
											<input onChange={handlePaymentInfoChange} value={paymentInfo?.cardNumber} name="cardNumber" type="text" className="input" placeholder="Enter card number" />
										</div>
									</div>
									<div className="expiration-date">
										<div className="input_wrap">
											<div className="flex-date">
												<label>Expiration Date</label>
												<label className='cvv-label'>CVC/CVV</label>
											</div>
											<div className="input_field flex-date">
												<div>
													<MonthPicker value={getMonth()}
																defaultValue={'MM'} 
																onChange={handleExpirationMonthChange}
																endYearGiven
																year={getYear()}
																classes={'input cvv'}/>
												</div>
												<div>
													<YearPicker start={new Date().getFullYear()} 
																end={new Date().getFullYear() + 10} 
																value={getYear()} 
																defaultValue={'YYYY'} 
																onChange={handleExpirationYearChange} 
																classes={'input cvv'}/>
												</div>
												<div>
													<input onChange={handlePaymentInfoChange} value={paymentInfo?.verificationCode} name="verificationCode" type="text" className="input cvv" placeholder="Enter CVC/CVV" />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</td>
					</tbody>
				</table>
				<table className="table">
					<thead>
						<tr>
							<th>Shipping Information</th>
						</tr>
					</thead>
					<tbody>
						<td>
							<div className="row">
								<div className="col-12 col-sm-12 col-lg">
									<div className="input_wrap">
										<label>Street</label>
										<div className="input_field">
											<input onChange={handleShippingInfoChange} value={shippingInfo?.streetName} name="streetName" type="text" className="input" placeholder="Enter street name" />
										</div>
									</div>
									<div className="address-box">
										<div className="input_wrap address">
											<label>City</label>
											<div className="input_field">
												<input onChange={handleShippingInfoChange} value={shippingInfo?.city} name="city" type="text" className="input" placeholder="Enter city" />
											</div>
										</div>
										<div className="input_wrap address">
											<label>Zip code</label>
											<div className="input_field">
												<input onChange={handleShippingInfoChange} value={shippingInfo?.zipCode} name="zipCode" type="text" className="input" placeholder="Enter zip code" />
											</div>
										</div>
									</div>
									<div className="input_wrap">
										<label>State</label>
										<div className="input_field">
											<input onChange={handleShippingInfoChange} value={shippingInfo?.state} name="state" type="text" className="input" placeholder="Enter state name" />
										</div>
									</div>
									<div className="input_wrap">
										<label>Country</label>
										<div className="input_field">
											<input onChange={handleShippingInfoChange} value={shippingInfo?.country} name="country" type="text" className="input" placeholder="Enter country name" />
										</div>
									</div>
								</div>
							</div>
						</td>
					</tbody>
				</table>
			</Modal.Body>
			<Modal.Footer>
				<div className="input_wrap submit">
					<input type="submit" id="update_btn" className="btn btn-lg submit-btn" value="Pay" disabled={!errors} />
				</div>
			</Modal.Footer>
		</form>
	  </Modal>
	)
}

export default PaymentModal
