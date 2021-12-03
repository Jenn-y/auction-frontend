import { Category } from "interfaces/Category"
import { useEffect, useState } from "react"
import CategoryService from "services/CategoryService"

const SubcategoriesList = (parentCategory: any, activeSubcategories: Category[], setActiveSubcategories: any) => {

	const [subcategories, setSubcategories] = useState([])

	useEffect(() => {
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

		if (!parentCategory.activeSubcategories.some((category: any) => category.id === subcategory.id)) {
            parentCategory.setActiveSubcategories([...parentCategory.activeSubcategories, subcategory])
        } else {
			parentCategory.setActiveSubcategories(parentCategory.activeSubcategories.filter((category: any) => category.id !== subcategory.id))
		}
	}

	const isChecked = (subcategory: any) => {
		return parentCategory.activeSubcategories.some((category: any) => category.id === subcategory) ? true : false
	}

	return (
		<div>
			{subcategories.map((subcategory: any) => {
				return (
					<div className="subcategory" key={subcategory.id}>
						<input type="checkbox" name="subcategory" checked={isChecked(subcategory.id)} onChange={() => handleSubcategoryClick(subcategory.id, subcategory.name, parentCategory)}/>
						<label htmlFor="subcategory">{subcategory.name} (120)</label>
					</div>
				)
			})}
		</div>
	)
}

export default SubcategoriesList
