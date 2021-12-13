import { Category } from "interfaces/Category"
import { useEffect, useState } from "react"
import AuctionService from "services/AuctionService"
import CategoryService from "services/CategoryService"

const SubcategoriesList = (parentCategory: any) => {

	const [subcategories, setSubcategories] = useState([])
	const [numOfAuctions, setNumOfAuctions] = useState(0)

	useEffect(() => {
		CategoryService.getSubcategoriesByCategoryId(parentCategory.category.id)
			.then(response => {
				if (response) {
					setSubcategories(response)
				}
			})
	}, [])

	const getCountBySubcategory = (subcategoryId: string) => {
		AuctionService.getCountBySubcategory(subcategoryId)
			.then(response => {
				if (response) {
					setNumOfAuctions(response)
				}
			})
		return numOfAuctions
	}

	const handleSubcategoryClick = (id: string, name: string, subcategoryOf: Category) => {
		const subcategory = {
            id: id,
            name: name,
			subcategoryOf: subcategoryOf,
        }

		if (!parentCategory.activeSubcategories.some((category: any) => category.id === subcategory.id)) {
            parentCategory.setActiveSubcategories([...parentCategory.activeSubcategories, subcategory])
        } else {
			parentCategory.onRemoveTagClick(subcategory)
		}
	}

	const isChecked = (subcategory: any) => {
		return parentCategory.activeSubcategories.some((category: any) => category.id === subcategory) ? true : false
	}

	return (
		<div>
			{subcategories.map((subcategory: any) => {
				return (
					<div className="subcategory" key={subcategory}>
						<input type="checkbox" name="subcategory" checked={isChecked(subcategory.id)} onChange={() => handleSubcategoryClick(subcategory.id, subcategory.name, parentCategory)}/>
						<label htmlFor="subcategory">{subcategory.name} <span>({getCountBySubcategory(subcategory.id)})</span></label>
					</div>
				)
			})}
		</div>
	)
}

export default SubcategoriesList
