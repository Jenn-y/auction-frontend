import { toast } from 'react-toastify';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { DropdownDate, DropdownComponent, YearPicker, MonthPicker } from 'react-dropdown-date'

import { User } from 'interfaces/User';
import AuthService from 'services/AuthService';
import { PaymentDetails } from 'interfaces/PaymentDetails';
import { ShippingDetails } from 'interfaces/ShippingDetails';

const ProfileSection = (props: any) => {
	const [user, setUser] = useState<User>()
	const [paymentInfo, setPaymentInfo] = useState<PaymentDetails>()
	const [shippingInfo, setShippingInfo] = useState<ShippingDetails>()

	useEffect(() => {
		AuthService.getUser(props.user.email, props.user.authenticationToken)
			.then(response => {
				if (response) {
					console.log(response)
					setUser(response)
					setShippingInfo(response.shippingDetails)
					setPaymentInfo(response.paymentDetails)
				}
			})
	}, [])

	const handleSubmit = (e: any) => {
		e.preventDefault();
		const finalUserData = {
            ...user,
            paymentDetails: paymentInfo,
            shippingDetails: shippingInfo
        };

		AuthService.update(
			props.user.id,
			finalUserData,
			props.user.authenticationToken
		).then(
			() => {
				toast.success("Edit sucessful!", { hideProgressBar: true });
				window.location.replace("/my_account/profile")
			}
		)
			.catch(() => {
				toast.error("Edit was not saved!", { hideProgressBar: true });
			});
	}

	const handleBasicInfoChange = (e: any) => {
		setUser(Object.assign({}, user, { [e.target.name]: e.target.value }))
	}

	const onBirthDateChange = (date: any) => {
		setUser(Object.assign({}, user, { dateOfBirth: date }))
    }

	const handleShippingInfoChange = (e: any) => {
		setShippingInfo(Object.assign({}, shippingInfo, { [e.target.name]: e.target.value }))
	}

	const handlePaymentInfoChange = (e: any) => {
		setPaymentInfo(Object.assign({}, paymentInfo, { [e.target.name]: e.target.value }))
	}

	const handlePaypalChange = (e: any) => {
		setPaymentInfo(Object.assign({}, paymentInfo, { paypal: true }))
	}

	const handleExpirationYearChange = (e: any) => {
		let newDate = new Date()
		newDate.setMonth(getMonth())
		newDate.setFullYear(e)
		setPaymentInfo(Object.assign({}, paymentInfo, { expirationDate: newDate }))
	}

	const handleExpirationMonthChange = (e: any) => {
		let newDate = new Date();
		newDate.setMonth(e)
		newDate.setFullYear(getYear())
		setPaymentInfo(Object.assign({}, paymentInfo, { expirationDate: newDate }))
	}

	const getDate = () => {
		return moment(user?.dateOfBirth).format("MM DD YYYY")
	}

	const getMonth = () => {
		return Number(moment(paymentInfo?.expirationDate).format("MM")) - 1
	}

	const getYear = () => {
		return Number(moment(paymentInfo?.expirationDate).format("YYYY"))
	}

    return (
        <div className="profile">
			<div className="row">
				<div className="col-12 col-sm-12 col-lg tabs">
					<form onSubmit={handleSubmit}>
						<table className="table">
							<thead>
								<tr>
									<th>Required</th>
								</tr>
							</thead>
							<tbody>
								<td>
									<div className="row">
										<div className="col-12 col-sm-4 col-lg image-box">
											<img className="profile_image" alt="profile" src="https://bootdey.com/img/Content/avatar/avatar7.png"></img>
											<button className="change-image-btn">CHANGE PHOTO</button>
											<input type="file" accept="image/*" className="input-file"></input>
										</div>
										<div className="col-12 col-sm-8 col-lg">
											<div className="input_wrap">
												<label>First Name</label>
												<div className="input_field">
													<input onChange={handleBasicInfoChange} value={user?.firstName} name="firstName" type="text" className="input" placeholder="Enter your first name" />
												</div>
											</div>
											<div className="input_wrap">
												<label>Last Name</label>
												<div className="input_field">
													<input onChange={handleBasicInfoChange} value={user?.lastName} name="lastName" type="text" className="input" placeholder="Enter your last name" />
												</div>
											</div>
											<div className="input_wrap">
												<label>I am</label>
												<div className="input_field">
													<select className="input" onChange={handleBasicInfoChange} name="gender">
														<option disabled selected>Gender</option>
														<option selected={user?.gender === 'MALE'}>MALE</option>
														<option selected={user?.gender === 'FEMALE'}>FEMALE</option>
													</select>
												</div>
											</div>
											<div className="input_wrap">
												<label>Date of birth</label>
												<div className="input_field">
													<DropdownDate 
														startDate={'1940-01-01'}
														defaultValues={                   
															{
																year: 'YYYY',
																month: 'MM',
																day: 'DD'
															}
														}
														classes={
															{
															  dateContainer: 'flex-date'
															}
														}
														order={[DropdownComponent.day, DropdownComponent.month, DropdownComponent.year]} 
														selectedDate={getDate()}
														onDateChange={onBirthDateChange}
													/>
												</div>
											</div>
											<div className="input_wrap">
												<label>Phone number</label>
												<div className="input_field">
													<input onChange={handleBasicInfoChange} value={user?.phoneNum} name="phoneNum" type="text" className="input" placeholder="Enter your phone" />
												</div>
											</div>
											<div className="input_wrap">
												<label>Email address</label>
												<div className="input_field">
													<input onChange={handleBasicInfoChange} value={user?.email} name="email" type="text" className="input" placeholder="Enter your email" />
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
									<th>Card Information</th>
								</tr>
							</thead>
							<tbody>
								<td>
									<div className="row">
										<div className="col-12 col-sm-4 col-lg image-box"></div>
										<div className="col-12 col-sm-8 col-lg">
											<div className="input_wrap">
												<div className="radio-input">
													<input checked={paymentInfo?.paypal} onChange={() => handlePaypalChange(true)} type="radio" id="paypal" name="radio"></input>
													<label htmlFor="paypal">Pay Pal</label>
												</div>
												<div className="credit-input">
													<div className="radio-input">
														<input checked={!paymentInfo?.paypal} onChange={() => handlePaypalChange(false)} type="radio" id="credit" name="radio"></input>
														<label htmlFor="credit">Credit Card</label>
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
									<th>Optional</th>
								</tr>
							</thead>
							<tbody>
								<td>
									<div className="row">
										<div className="col-12 col-sm-4 col-lg image-box"></div>
										<div className="col-12 col-sm-8 col-lg">
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
						<div className="input_wrap submit">
							<input type="submit" id="update_btn" className="btn btn-lg submit-btn" value="Save Info" />
						</div>
					</form>
				</div>
			</div>
		</div>
    );
}

export default ProfileSection
