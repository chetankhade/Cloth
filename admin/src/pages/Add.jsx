import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import io from 'socket.io-client';

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const [image5, setImage5] = useState(false)
  const [image6, setImage6] = useState(false)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState(0.5);
  const [category, setCategory] = useState("Cloths (Men)");
  const [subCategory, setSubCategory] = useState("T-Shirts");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const socket = io(backendUrl);
    socket.on('upload-progress', (data) => {
      setUploadProgress(data.progress);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Size options based on category and subcategory (Indian Standards)
  const getSizeOptions = () => {

    // FOOTWEAR
    if (category === "Footwear") {
      return [
        "6", "7", "8", "9", "10",
        "11", "12", "13", "14"
      ];
    }

    // CLOTHES - MEN
    if (category === "Clothes (Men)") {

      if (["Pants", "Jeans", "Shorts"].includes(subCategory)) {
        return [
          "28", "30", "32", "34", "36", "38",
          "40", "42", "44", "46", "48", "50",
          "52", "54", "56", "58", "60"
        ];
      }

      return [
        "S", "M", "L", "XL", "XXL",
        "XXXL", "3XL", "4XL", "5XL", "6XL"
      ];
    }

    // CLOTHES - WOMEN
    if (category === "Clothes (Women)") {

      if (["Pants & Jeans", "Skirts"].includes(subCategory)) {
        return [
          "26", "28", "30", "32", "34", "36",
          "38", "40", "42", "44", "46", "48"
        ];
      }

      return [
        "XS", "S", "M", "L", "XL", "XXL",
        "XXXL", "3XL", "4XL", "5XL", "6XL"
      ];
    }

    // CLOTHES - KIDS
    if (category === "Clothes (Kids)") {

      if (subCategory === "Infant Wear") {
        return [
          "0-3 Months",
          "3-6 Months",
          "6-9 Months",
          "9-12 Months",
          "12-18 Months",
          "18-24 Months"
        ];
      }

      return [
        "1-2 Years",
        "2-3 Years",
        "3-4 Years",
        "4-5 Years",
        "5-6 Years",
        "6-7 Years",
        "7-8 Years",
        "8-9 Years",
        "9-10 Years",
        "10-11 Years",
        "11-12 Years",
        "12-13 Years"
      ];
    }

    // UNDERGARMENTS - MEN & WOMEN
    if (category === "Undergarments (Men & Women)") {

      // Men's underwear
      if (["Briefs", "Boxers"].includes(subCategory)) {
        return [
          "28", "30", "32", "34", "36", "38",
          "40", "42", "44", "46", "48", "50",
          "52", "54", "56", "58", "60"
        ];
      }

      // Women's Bras
      if (subCategory === "Bras") {
        return [
          "32A", "32B", "32C", "32D", "32DD",
          "34A", "34B", "34C", "34D", "34DD",
          "36A", "36B", "36C", "36D", "36DD",
          "38A", "38B", "38C", "38D", "38DD",
          "40A", "40B", "40C", "40D", "40DD",
          "42A", "42B", "42C", "42D", "42DD"
        ];
      }

      // Women's underwear / lingerie
      if (
        ["Panties", "Lingerie", "Shapewear", "Sleepwear"]
          .includes(subCategory)
      ) {
        return [
          "XS", "S", "M", "L", "XL",
          "XXL", "XXXL", "3XL", "4XL"
        ];
      }

      // Men's vests / undershirts / thermal
      if (
        ["Vests", "Undershirts", "Thermal Wear"]
          .includes(subCategory)
      ) {
        return [
          "S", "M", "L", "XL", "XXL",
          "XXXL", "3XL", "4XL", "5XL", "6XL"
        ];
      }

      return [
        "S", "M", "L", "XL", "XXL",
        "XXXL", "3XL", "4XL"
      ];
    }

    // JEWELLERY & ACCESSORIES
    if (category === "Jewellery & Accessories") {

      // Rings
      if (subCategory === "Rings") {
        return [
          "Size 5",
          "Size 6",
          "Size 7",
          "Size 8",
          "Size 9",
          "Size 10",
          "Size 11",
          "Size 12",
          "Adjustable"
        ];
      }

      // Bracelets / Anklets
      if (["Bracelets", "Anklets"].includes(subCategory)) {
        return [
          "Small (6 inch)",
          "Medium (7 inch)",
          "Large (8 inch)",
          "Extra Large (9 inch)",
          "Adjustable"
        ];
      }

      // Necklaces / Earrings / Watches
      if (
        ["Necklaces", "Earrings", "Watches"]
          .includes(subCategory)
      ) {
        return [
          "Small",
          "Medium",
          "Large",
          "Adjustable",
          "One Size"
        ];
      }
    }
    return [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL",
      "3XL",
      "4XL"
    ];
  };

  // Category and subcategory mapping
  const categorySubcategories = {
    "Clothes (Men)": [
      "T-Shirts",
      "Shirts",
      "Pants",
      "Jeans",
      "Shorts",
      "Jackets",
      "Sweaters",
      "Formal Wear"
    ],

    "Clothes (Women)": [
      "Dresses",
      "Tops & Blouses",
      "Pants & Jeans",
      "Skirts",
      "Jackets",
      "Sweaters",
      "Activewear"
    ],

    "Clothes (Kids)": [
      "Boys Clothing",
      "Girls Clothing",
      "Infant Wear",
      "School Uniforms",
      "Playwear"
    ],

    "Undergarments (Men & Women)": [
      "Bras",
      "Panties",
      "Lingerie",
      "Shapewear",
      "Sleepwear",
      "Briefs",
      "Boxers",
      "Vests",
      "Undershirts",
      "Thermal Wear"
    ],

    "Footwear": [
      "Sneakers",
      "Casual Shoes",
      "Formal Shoes",
      "Sandals",
      "Boots",
      "Sports Shoes"
    ],

    "Jewellery & Accessories": [
      "Necklaces",
      "Earrings",
      "Rings",
      "Bracelets",
      "Watches",
      "Anklets"
    ]
  };

  // Update subcategory when category changes
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    // Set first subcategory as default
    if (categorySubcategories[newCategory] && categorySubcategories[newCategory].length > 0) {
      setSubCategory(categorySubcategories[newCategory][0]);
    }
    // Clear sizes when category changes to prevent incorrect selections
    setSizes([]);
  };

  // Update subcategory and clear sizes when subcategory changes
  const handleSubCategoryChange = (e) => {
    setSubCategory(e.target.value);
    // Clear sizes when subcategory changes to prevent incorrect selections
    setSizes([]);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("weight", weight)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      formData.append("image1", image1)
      formData.append("image2", image2)
      formData.append("image3", image3)
      formData.append("image4", image4)
      formData.append("image5", image5)
      formData.append("image6", image6)

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setImage5(false)
        setImage6(false)
        setPrice('')
        setWeight(0.5)
        setUploadProgress(0);
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image (Up to 6 images)</p>

        <div className='flex flex-wrap gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
          <label htmlFor="image5">
            <img className='w-20' src={!image5 ? assets.upload_area : URL.createObjectURL(image5)} alt="" />
            <input onChange={(e) => setImage5(e.target.files[0])} type="file" id="image5" hidden />
          </label>
          <label htmlFor="image6">
            <img className='w-20' src={!image6 ? assets.upload_area : URL.createObjectURL(image6)} alt="" />
            <input onChange={(e) => setImage6(e.target.files[0])} type="file" id="image6" hidden />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

        <div>
          <p className='mb-2'>Product category</p>
          <select onChange={handleCategoryChange} value={category} className='w-full px-3 py-2'>
            <option value="Clothes (Men)">Clothes (Men)</option>
            <option value="Clothes (Women)">Clothes (Women)</option>
            <option value="Clothes (Kids)">Clothes (Kids)</option>
            <option value="Undergarments (Men & Women)">Undergarments (Men & Women)</option>
            <option value="Footwear">Footwear</option>
            <option value="Jewellery & Accessories">Jewellery & Accessories</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub category</p>
          <select onChange={handleSubCategoryChange} value={subCategory} className='w-full px-3 py-2'>
            {categorySubcategories[category]?.map((subCat) => (
              <option key={subCat} value={subCat}>{subCat}</option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
        </div>

        <div>
          <p className='mb-2'>Product Weight (kg)</p>
          <input onChange={(e) => setWeight(e.target.value)} value={weight} className='w-full px-3 py-2 sm:w-[120px]' type="Number" step="0.01" placeholder='0.5' />
        </div>

      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex flex-wrap gap-3 max-h-60 overflow-y-auto'>
          {[...new Set([...getSizeOptions(), "Free size "])].map((size) => (
            <div
              key={size}
              onClick={() => setSizes(prev =>
                prev.includes(size)
                  ? prev.filter(item => item !== size)
                  : [...prev, size]
              )}
            >
              <p className={`${sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer hover:bg-pink-50 transition-colors`}>
                {size}
              </p>
            </div>
          ))}
        </div>
        {sizes.length > 0 && (
          <p className='mt-2 text-sm text-gray-500'>
            Selected: {sizes.join(", ")}
          </p>
        )}
      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button
        type="submit"
        className={`w-28 py-3 mt-4 text-white transition-all duration-300 ${isUploading
          ? 'bg-gray-600 cursor-not-allowed'
          : 'bg-black hover:bg-gray-800'
          }`}
        disabled={isUploading}
      >
        {isUploading ? `${Math.round(uploadProgress)}%` : 'ADD'}
      </button>

    </form>
  )
}

export default Add