import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import moment from 'moment'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Step, StepIcon, StepLabel, Stepper } from '@material-ui/core'

import { Category } from 'interfaces/Category'
import CategoryService from 'services/CategoryService'
import { Auction } from 'interfaces/Auction'
import { Item } from 'interfaces/Item'
import { User } from 'interfaces/User'
import { ShippingDetails } from 'interfaces/ShippingDetails'
import AuthService from 'services/AuthService'
import AuctionService from 'services/AuctionService';
import { isValidAuctionSellingInput } from 'utils/Validations';

import './AddAuction.scss'

const AddAuction = () => {
	const [categories, setCategories] = useState<Category[]>([])
	const [subcategories, setSubcategories] = useState<Category[]>([])
	const [selectedCategory, setSelectedCategory] = useState<Category>()
	const [item, setItem] = useState<Item>()
	const [auction, setAuction] = useState<Auction>()
	const [step, setStep] = useState(0)
	const [loggedUser, setLoggedUser] = useState<any>()
	const [user, setUser] = useState<User>()
	const [shippingInfo, setShippingInfo] = useState<ShippingDetails>()
	const [error, setError] = useState({ message: '', hasError: false })

	useEffect(() => {
		CategoryService.getAllCategories()
            .then(response => {
                if (response) {
                    setCategories(response)
                }
            })

		setLoggedUser(AuthService.getCurrentUser())
	}, [])

	useEffect(() => {
		AuthService.getUserById(loggedUser?.id, loggedUser?.authenticationToken)
			.then(response => {
				if (response) {
					setUser(response)
					if (response.shippingDetails) {
						setShippingInfo(response.shippingDetails)
					}
				}
			})
	}, [step])

	const handleBackButtonClick = () => {
		setStep(step-1)
	}

	const handleNextButtonClick = () => {
		setStep(step+1)
		validateInput()
	}

	const handleAuctionChange = (e: any) => {
		setAuction(Object.assign({}, auction, { [e.target.name]: e.target.value }))
	}

	const handleItemChange = (e: any) => {
		setItem(Object.assign({}, item, { [e.target.name]: e.target.value }))
	}

	const handleShippingInfoChange = (e: any) => {
		setShippingInfo(Object.assign({}, shippingInfo, { [e.target.name]: e.target.value }))
		validateInput()
	}

	const handlePhoneChange = (e: any) => {
		setUser(Object.assign({}, user, { [e.target.name]: e.target.value }))
		validateInput()
	}

	const handleSelectCategory = (e: any) => {
		CategoryService.getCategory(e.target.value)
            .then(response => {
                if (response) {
                    setSelectedCategory(response)
					if (!response.subcategoryOf) {
						getSubcategoriesByCategoryId(e.target.value)
					}
                }
            })
	}

	const validateInput = () => {
		const finalUserData = {
            ...user,
            shippingDetails: shippingInfo
        }

		const finalAuctionData = {
            ...auction,
            item: item,
			seller: user,
			category: selectedCategory
        }
		setError(isValidAuctionSellingInput(finalAuctionData, finalUserData))
	}

	const handleSubmit = () => {
		const finalUserData = {
            ...user,
            shippingDetails: shippingInfo
        }

		const finalAuctionData = {
            ...auction,
            item: item,
			seller: user,
			category: selectedCategory
        }
		setError(isValidAuctionSellingInput(finalAuctionData, finalUserData))
		if (!error.hasError) {
			AuthService.update(
				loggedUser.id,
				finalUserData,
				loggedUser.authenticationToken
			)

			AuctionService.addAuction(finalAuctionData, loggedUser.authenticationToken)
			.then(
				() => {
					toast.success("Auction successfully added!", { hideProgressBar: true });
					window.location.replace("/my_account/seller")
				}
			)
		} else {
			toast.error(error.message, { hideProgressBar: true });
		}
	}

	const getSubcategoriesByCategoryId = (categoryId: string) => {
		CategoryService.getSubcategoriesByCategoryId(categoryId)
            .then(response => {
                if (response) {
                    setSubcategories(response)
                }
            })
	}

	const getStartDate = () => {
		return auction?.startDate ? moment(auction?.startDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)
	}

	const getEndDate = () => {
		return auction?.endDate ? moment(auction.endDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)
	}
	
    return (
		<div className="container">
			<div className="row">
				<div className="col-12 col-sm-12 col-lg stepper-box">
					<Stepper activeStep={step}>
						<Step><StepLabel StepIconComponent={StepIcon}></StepLabel></Step>
						<Step><StepLabel StepIconComponent={StepIcon}></StepLabel></Step>
						<Step><StepLabel StepIconComponent={StepIcon}></StepLabel></Step>
					</Stepper>
				</div>
			</div>
			<div className="row">
				<div className="col-12 col-sm-12 col-lg">
					<div className="form">
						{step === 0 ? 
							<>
								<div className="title">ADD ITEM</div>
								<div className="input_wrap">
									<label>What do you sell?</label>
									<div className="input_field">
										<input onChange={handleItemChange} value={item?.name} name="name" type="text" className="input" placeholder="Enter item name" />
									</div>
								</div>
								<div className="flex-box">
									<div className="categories-list">
										<select name="category" onChange={handleSelectCategory}>
											<option disabled selected>Select Category</option>
											{categories.map((category: any) => <option key={category.id} value={category.id}>{category.name}</option>)}
										</select>
									</div>
									<div className="">
										<select name="subcategory" onChange={handleSelectCategory}>
											<option disabled selected>Select Subcategory</option>
											{subcategories.map((subcategory: any) => <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>)}
										</select>
									</div>
								</div>
								<div className="input-wrap description">
									<label>Description</label>
									<div className="input_field">
										<textarea className="input" onChange={handleItemChange} value={item?.description} name="description"></textarea>
										<p>100 words (700 characters)</p>
									</div>
								</div>
							</> : ''
						}
						{step === 1 ? 
							<>
								<div className="title">SET PRICES</div>
								<div className="input_wrap">
									<label>Your start price</label>
									<div className="input_field price-box">
										<div className="price-icon">$</div>
										<input onChange={handleAuctionChange} value={auction?.startPrice} name="startPrice" type="number" className="input start-price" />
									</div>
								</div>
								<div className="flex-box">
									<div className="categories-list">
										<label>Start Date</label>
										<div className="input_field">
											<input type="date" name="startDate" onChange={handleAuctionChange} value={getStartDate()}></input>
										</div>
									</div>
									<div className="">
										<label>End Date</label>
										<div className="input_field">
											<input type="date" name="endDate" onChange={handleAuctionChange} value={getEndDate()}></input>
										</div>
									</div>
									<p>The auction will be automatically closed when the end time comes. The highest bid will win the auction.</p>
								</div>
							</> : ''
						}
						{step === 2 ? 
							<>
								<div className="title">LOCATION & SHIPPING</div>
								<div className="input_wrap">
									<label>Address</label>
									<div className="input_field">
										<input onChange={handleShippingInfoChange} value={shippingInfo ? shippingInfo.streetName : ''} name="streetName" type="text" className="input" placeholder="Enter your address" />
									</div>
								</div>
								<div className="flex-box">
									<div className="input_wrap c-location">
										<label>City</label>
										<div className="input_field">
											<input onChange={handleShippingInfoChange} value={shippingInfo ? shippingInfo.city : ''} name="city" type="text" className="input" placeholder="Enter your city" />
										</div>
									</div>
									<div className="input_wrap c-location">
										<label>Country</label>
										<div className="input_field">
											<input onChange={handleShippingInfoChange} value={shippingInfo ? shippingInfo.country: ''} name="country" type="text" className="input" placeholder="Enter your country" />
										</div>
									</div>
								</div>
								<div className="input_wrap">
									<label>Zip Code</label>
									<div className="input_field">
										<input onChange={handleShippingInfoChange} value={shippingInfo ? shippingInfo.zipCode : ''} name="zipCode" type="number" className="input" placeholder="Enter your zip code" />
									</div>
								</div>
								<div className="input_wrap">
									<label>Phone</label>
									<div className="input_field">
										<input onChange={handlePhoneChange} value={user ? user.phoneNum : ''} name="phoneNum" type="text" className="input" placeholder="Enter your phone" />
									</div>
								</div>
							</> : ''
						}
						<div className="input_wrap navigation">
							<button className="back-button" onClick={handleBackButtonClick}><FontAwesomeIcon icon={faChevronLeft}/> BACK</button>
							{step === 2 ? 
								<button className="next-button" onClick={handleSubmit}>DONE</button> :
								<button className="next-button" onClick={handleNextButtonClick}>NEXT <FontAwesomeIcon icon={faChevronRight}/></button>
							}
						</div> 
					</div>
				</div>
			</div>
		</div>
	)
}

export default AddAuction
