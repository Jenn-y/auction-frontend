import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'

import { PaymentDetails } from 'interfaces/PaymentDetails'
import { ShippingDetails } from 'interfaces/ShippingDetails'
import { User } from 'interfaces/User'
import AuthService from 'services/AuthService'
import PaymentService from 'services/PaymentService'
import { validateRequiredFields } from 'utils/Validations'

import './PaymentModal.scss';

const PaymentModal = (props: any) =>  {
	const [user, setUser] = useState<User>()
	const [token, setToken] = useState<string>()
	const [paymentInfo, setPaymentInfo] = useState<PaymentDetails>()
	const [shippingInfo, setShippingInfo] = useState<ShippingDetails>()
	const [errors, setErrors] = useState(false)
	const elements = useElements();
    const stripe = useStripe();

	useEffect(() => {
		if (!elements || !stripe) {
            return;
        }

		AuthService.getUserById(props.user.id, props.user.authenticationToken)
		.then(response => {
			if (response) {
				setUser(response)
				setShippingInfo(response.shippingDetails)
				setPaymentInfo(response.paymentDetails)
				setErrors(validateRequiredFields(response.shippingDetails, response.paymentDetails))
			}
		})

		setToken(AuthService.getCurrentUser().authenticationToken)
	}, [])

	const handleClose = () => {
		props.setOpenModal(false)
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const finalUserData = {
            ...user,
            paymentDetails: {
				...paymentInfo,
				paypal: false
			},
            shippingDetails: shippingInfo
        }

		// if (!errors && user && token) {
		// 	AuthService.update(
		// 		user?.id,
		// 		finalUserData,
		// 		token
		// 	).then(
		// 		() => {
		// 			toast.success("Edit sucessful!", { hideProgressBar: true });
		// 			window.location.replace("/my_account/profile")
		// 		}
		// 	)
		// }
		
		const cardElement = elements?.getElement(CardNumberElement)
		if (cardElement) {
			const result = await stripe?.createPaymentMethod({
				type: 'card',
				card: cardElement,
				billing_details: {
					email: user?.email,
					name: user?.firstName,
					address: {
						city: shippingInfo?.city,
						country: shippingInfo?.country,
            			line1: shippingInfo?.streetName,
						postal_code: shippingInfo?.zipCode,
						state: shippingInfo?.state,
					},
				}
			})

			if(!result?.error && token) {
				const payment = {
					amount: props.price,
					date: Date.now(),
					paymentMethod: result?.paymentMethod.id,
					buyer: finalUserData,
					auction: props.auction
				};

				toast.info("Processing...", { hideProgressBar: true });
				PaymentService.processPayment(payment, token)
				.then(response => {
					if (response && response === 'succeeded') {
						toast.success("Payment successful!", { hideProgressBar: true });
						window.location.replace("/my_account/bids");
					} else {
						toast.error("Payment invalid!", { hideProgressBar: true });
					}
				})
			}
		}
	}

	const handleShippingInfoChange = (e: any) => {
		setShippingInfo(Object.assign({}, shippingInfo, { [e.target.name]: e.target.value }))
		setErrors(validateRequiredFields(shippingInfo, paymentInfo))
	}

	const handlePaymentInfoChange = (e: any) => {
		setPaymentInfo(Object.assign({}, paymentInfo, { [e.target.name]: e.target.value }))
		setErrors(validateRequiredFields(shippingInfo, paymentInfo))
	}

	return (
	  <Modal size="lg" show={true} onHide={handleClose} contentClassName="payment-modal">
		<form onSubmit={handleSubmit}>
			<Modal.Header closeButton>
			<Modal.Title>Payment</Modal.Title>
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
										<div className="credit-input">
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
										<div className="input">
											<CardNumberElement />
										</div>
									</div>
									<div className="expiration-date">
										<div className="flex-date">
											<div className="input_wrap">
												<label>Expiration Date</label>
												<div className="input">
													<CardExpiryElement />
												</div>
											</div>
											<div className="input_wrap">
												<label className='cvv-label'>CVC/CVV</label>
												<div className="input">
													<CardCvcElement />
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
