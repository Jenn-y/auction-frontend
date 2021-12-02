import { Category } from "interfaces/Category"
import { useEffect, useState } from "react"
import CategoryService from "services/CategoryService"

const SubcategoriesList = (parentCategory: any, selectedCategories: Category[], setSelectedCategories: any) => {

	const [subcategories, setSubcategories] = useState([])

	useEffect(() => {

		console.log(selectedCategories)
		CategoryService.getSubcategoriesByCategoryId(parentCategory.category.id)
			.then(response => {
				if (response) {
					setSubcategories(response)
				}
			})
	}, [])

	const handleSubcategoryClick = (id: string, name: string, subcategoryOf: Category) => {
		const subcategory = {
            id: id,
            name: name,
			subcategoryOf: subcategoryOf,
        }

		if (!selectedCategories.some((category: any) => category.id === subcategory.id)) {
            setSelectedCategories([...selectedCategories, subcategory])
        } else {
			setSelectedCategories(selectedCategories.filter((category: any) => category.id !== subcategory.id))
		}
	}

	const isChecked = (subcategory: any) => {
		return selectedCategories.some((category: any) => category.id === subcategory) ? true : false
	}

	return (
		<div>
			{/* {subcategories.map((subcategory: any) => {
				return (
					<div className="subcategory" key={subcategory.id}>
						<input type="checkbox" name="subcategory" checked={isChecked(subcategory.id)} onChange={() => handleSubcategoryClick(subcategory.id, subcategory.name, parentCategory)}/>
						<label htmlFor="subcategory">{subcategory.name} (120)</label>
					</div>
				)
			})} */}
		</div>
	)
}

export default SubcategoriesList
