import { DropdownDate, DropdownComponent } from 'react-dropdown-date'

const ProfileSection = () => {
    return (
        <div className="profile">
			<div className="row">
				<div className="col-12 col-sm-12 col-lg tabs">
					<form>
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
													<input name="firstName" type="text" className="input" placeholder="Enter your first name" />
												</div>
											</div>
											<div className="input_wrap">
												<label>Last Name</label>
												<div className="input_field">
													<input name="lastName" type="text" className="input" placeholder="Enter your last name" />
												</div>
											</div>
											<div className="input_wrap">
												<label>I am</label>
												<div className="input_field">
													<select className="input">
														<option disabled>Gender</option>
														<option>Male</option>
														<option>Female</option>
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
													/>
												</div>
											</div>
											<div className="input_wrap">
												<label>Phone number</label>
												<div className="input_field">
													<input name="phone" type="text" className="input" placeholder="Enter your phone" />
												</div>
											</div>
											<div className="input_wrap">
												<label>Email address</label>
												<div className="input_field">
													<input name="email" type="text" className="input" placeholder="Enter your email" />
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
													<input type="radio"></input>
													<label>Pay Pal</label>
												</div>
												<div className="credit-input">
													<div className="radio-input">
														<input type="radio"></input>
														<label>Credit Card</label>
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
													<input name="cardName" type="text" className="input" placeholder="Enter card name" />
												</div>
											</div>
											<div className="input_wrap">
												<label>Card number</label>
												<div className="input_field">
													<input name="cardNumber" type="text" className="input" placeholder="Enter card number" />
												</div>
											</div>
											<div className="expiration-date">
												<div className="input_wrap">
													<div className="flex-date">
														<label>Expiration Date</label>
														<label className='cvv-label'>CVC/CVV</label>
													</div>
													<div className="input_field flex-date">
														<DropdownDate 
															startDate={'2018-01-01'}
															defaultValues={                   
																{
																	year: 'YYYY',
																	month: 'MM',
																}
															}
															classes={
																{
																  dateContainer: 'flex-date'
																}
															}
															order={[DropdownComponent.month, DropdownComponent.year]} 
														/>
														<input name="cvv" type="text" className="input cvv" placeholder="Enter CVC/CVV" />
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
													<input name="street" type="text" className="input" placeholder="Enter street name" />
												</div>
											</div>
											<div className="address-box">
												<div className="input_wrap address">
													<label>City</label>
													<div className="input_field">
														<input name="city" type="text" className="input" placeholder="Enter city" />
													</div>
												</div>
												<div className="input_wrap address">
													<label>Zip code</label>
													<div className="input_field">
														<input name="zipCode" type="text" className="input" placeholder="Enter zip code" />
													</div>
												</div>
											</div>
											<div className="input_wrap">
												<label>State</label>
												<div className="input_field">
													<input name="state" type="text" className="input" placeholder="Enter state name" />
												</div>
											</div>
											<div className="input_wrap">
												<label>Country</label>
												<div className="input_field">
													<input name="country" type="text" className="input" placeholder="Enter country name" />
												</div>
											</div>
										</div>
									</div>
								</td>
							</tbody>
						</table>
					</form>
				</div>
			</div>
		</div>
    );
}

export default ProfileSection
