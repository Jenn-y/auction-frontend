import { useEffect, useState } from "react"

import CategoryService from "services/CategoryService"
import NoOfAuctions from "utils/helper_components/NoOfAuctions"
import { Category } from "interfaces/Category"

const SubcategoriesList = (props: any) => {
    const [subcategories, setSubcategories] = useState([])

    useEffect(() => {
        CategoryService.getSubcategoriesByCategoryId(props.category.id)
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

        if (!props.activeCategories.some((category: any) => category.id === subcategory.id)) {
            props.setActiveCategories([...props.activeCategories, subcategory])
        } else {
            props.onRemoveTagClick(subcategory)
        }
    }

    const isChecked = (subcategory: any) => {
        return props.activeCategories.some((category: any) => category.id === subcategory) ? true : false
    }

    return (
        <div>
            {subcategories.map((subcategory: any) => {
                return (
                    <div className="subcategory" key={subcategory}>
                        <input type="checkbox" name="subcategory" checked={isChecked(subcategory.id)} onChange={() => handleSubcategoryClick(subcategory.id, subcategory.name, props.category)}/>
                        <label htmlFor="subcategory">{subcategory.name} <span>(<NoOfAuctions subcategoryId={subcategory.id} />)</span></label>
                    </div>
                )
            })}
        </div>
    )
}

export default SubcategoriesList
