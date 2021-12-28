import { useEffect, useMemo, useState } from 'react'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Step, StepIcon, StepLabel, Stepper } from '@material-ui/core'

import { Category } from 'interfaces/Category'
import CategoryService from 'services/CategoryService'

import './AddAuction.scss'

const AddAuction = () => {
	const [categories, setCategories] = useState<Category[]>([])
	const [subcategories, setSubcategories] = useState<Category[]>([])
	const [selectedCategory, setSelectedCategory] = useState<Category>()
	const [step, setStep] = useState(0)

	useEffect(() => {
		CategoryService.getAllCategories()
            .then(response => {
                if (response) {
                    setCategories(response)
                }
            })
	}, [])

	const handleBackButtonClick = () => {
		setStep(step-1)
		console.log(step)
	}

	const handleNextButtonClick = () => {
		setStep(step+1)
		console.log(step)
	}

	const getOptions = (categories: any) => {
        return categories.map((category: any) => <option key={category.categoryId} value={category.id}>{category.name}</option>);
    };

    const categoriesOptions = useMemo(() => getOptions(categories), [categories]);
	
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
										<input name="itemName" type="text" className="input" placeholder="Enter item name" />
									</div>
								</div>
								<div className="flex-box">
									<div className="categories-list">
										<select name="category">
											<option value="">Select Category</option>
											{categoriesOptions}
										</select>
									</div>
									<div className="">
										<select name="category">
											<option value="">Select Category</option>
											{categoriesOptions}
										</select>
									</div>
								</div>
								<div className="input-wrap description">
									<label>Description</label>
									<div className="input_field">
										<textarea className="input"></textarea>
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
										<input name="startPrice" type="number" className="input start-price" />
									</div>
								</div>
								<div className="flex-box">
									<div className="categories-list">
										<label>Start Date</label>
										<div className="input_field">
											<input type="date" name="startDate"></input>
										</div>
									</div>
									<div className="">
										<label>End Date</label>
										<div className="input_field">
											<input type="date" name="endDate"></input>
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
										<input name="address" type="text" className="input" placeholder="Enter your address" />
									</div>
								</div>
								<div className="flex-box">
									<div className="categories-list">
										<select name="category">
											<option value="">Select City</option>
											{categoriesOptions}
										</select>
									</div>
									<div className="">
										<select name="category">
											<option value="">Select Country</option>
											{categoriesOptions}
										</select>
									</div>
								</div>
								<div className="input_wrap">
									<label>Zip Code</label>
									<div className="input_field">
										<input name="zipCode" type="number" className="input" placeholder="Enter your zip code" />
									</div>
								</div>
								<div className="input_wrap">
									<label>Phone</label>
									<div className="input_field">
										<input name="phone" type="text" className="input" placeholder="Enter your phone" />
									</div>
								</div>
							</> : ''
						}
						<div className="input_wrap navigation">
							<button className="back-button" onClick={handleBackButtonClick}><FontAwesomeIcon icon={faChevronLeft}/> BACK</button>
							<button className="next-button" onClick={handleNextButtonClick}>NEXT <FontAwesomeIcon icon={faChevronRight}/></button>
						</div> 
					</div>
				</div>
			</div>
		</div>
	)
}

export default AddAuction
