"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  ChevronRight,
  Diamond,
  Award,
  Download,
  ExternalLink,
  FileText,
  History,
  Instagram,
  Mail,
  MessageSquare,
  Phone,
  Send,
  Star,
  User2,
  ThumbsUp,
  Share2,
  Facebook,
  Sparkles,
  MapPin,
  ShoppingBagIcon,
  Utensils,
} from "lucide-react"

interface Receipt {
  id: string
  date: string
  time: string
  associate: string
  branch: string
  currency: string
  items: Array<{
    id: number
    name: string
    description: string
    price: number
    quantity: number

    // Product Details
    skuId: string
    teaType: string
    collection: string
    flavour: string
    packaging: string
    size: string

    // Optional Product Tags
    origin?: string
    caffeineLevel?: string
    limitedEdition?: boolean
  }>
  subtotal: number
  tax: number
  total: number
}
export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showTerms, setShowTerms] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [expandedProducts, setExpandedProducts] = useState<number[]>([])
  const [expandedSections, setExpandedSections] = useState<{ [key: number]: string[] }>({})
  const [currentReceiptId, setCurrentReceiptId] = useState("current")
  const [showTransactionHistory, setShowTransactionHistory] = useState(false)
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
  const [showReferModal, setShowReferModal] = useState(false)
  const [showStoreLocation, setShowStoreLocation] = useState(false)
  const receiptContainerRef = useRef<HTMLDivElement>(null)
  const [expandedItemFeedback, setExpandedItemFeedback] = useState([]) 
  const [itemFeedback, setItemFeedback] = useState({})
  const [feedback, setFeedback] = useState({
    service: 0,
    quality: 0,
    style: 0,
    pricing: 0,
    store: 0,
    comments: "",
  })
  const [profile, setProfile] = useState({
    mobile: "",
    name: "",
    email: "",
    gender: "",
  })
  const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [rating, setRating] = useState(0)
  const [feedbackText, setFeedbackText] = useState("")

  const customerName = "Deepak"

  // Carousel refs and APIs
  const [promoApi, setPromoApi] = useState<CarouselApi>()
  const feedbackButtonRef = useRef<HTMLButtonElement>(null)
  const historyButtonRef = useRef<HTMLButtonElement>(null)
  const referButtonRef = useRef<HTMLButtonElement>(null)

  // Auto-play effect for promo carousel
  useEffect(() => {
    if (!promoApi) return
    const interval = setInterval(() => {
      promoApi.scrollNext()
    }, 4000)
    return () => clearInterval(interval)
  }, [promoApi])

  // Simple auto-height for WordPress iframe
  useEffect(() => {
    const postHeight = () => {
      const marker = document.getElementById("height-marker")
      if (marker && window.parent) {
        const rect = marker.getBoundingClientRect()
        const newHeight = Math.ceil(rect.top + rect.height + window.scrollY)
        window.parent.postMessage({ frameHeight: newHeight }, "*")
      }
    }

    // Run on load
    postHeight()

    // Observe changes to the DOM
    const ro = new ResizeObserver(postHeight)
    ro.observe(document.body)

    // Re-run on resize
    window.addEventListener("resize", postHeight)

    return () => {
      ro.disconnect()
      window.removeEventListener("resize", postHeight)
    }
  }, [])

  // Update current slide when carousel changes
  useEffect(() => {
    if (!promoApi) return
    promoApi.on("select", () => {
      setCurrentSlide(promoApi.selectedScrollSnap())
    })
  }, [promoApi])

const receipts = {

  current: {
    id: "TWG-SG-95018472",
    date: "05-05-2026",
    time: "16:28:14",
    associate: "Charlotte Lim",
    branch: "TWG Tea Salon & Boutique Marina Bay Sands",
    currency: "SGD",

    items: [
      {
        id: 0,
        name: "Grand Malawi",
        description: "Single estate blue tea with bright citrus undertones",
        price: 127,
        quantity: 1,

        skuId: "TCTWG9069",
        teaType: "Blue Tea / Oolong",
        collection: "Single Estate Tea",
        flavour: "Citrus",
        packaging: "Loose Leaf Tea",
        size: "100g pack"
      },
      {
        id: 1,
        name: "Moroccan Mint Tea",
        description: "Refreshing green tea blended with vibrant mint notes",
        price: 58,
        quantity: 1,

        skuId: "TCTWG9205",
        teaType: "Green Tea",
        collection: "Grand Classic Tea",
        flavour: "Mint",
        packaging: "Tea Bags",
        size: "15 bags"
      },
      {
        id: 2,
        name: "Jardin Vendôme Teabag",
        description: "Elegant floral green tea blend in handcrafted tea bags",
        price: 30,
        quantity: 2,

        skuId: "PACKTBEX002",
        teaType: "Green Tea",
        collection: "Exclusive Tea Blend",
        flavour: "Floral",
        packaging: "Tea Bags",
        size: "15 bags"
      }
    ],

    subtotal: 245,
    tax: 22.05,
    total: 267.05
  },

  hist1: {
    id: "TWG-SG-95018421",
    date: "22-04-2026",
    time: "13:12:47",
    associate: "Ethan Koh",
    branch: "TWG Tea Takashimaya Shopping Centre",
    currency: "SGD",

    items: [
      {
        id: 0,
        name: "Ritzy Earl Grey",
        description: "Sophisticated black tea infused with citrus bergamot",
        price: 48,
        quantity: 1,

        skuId: "TCTWG9089",
        teaType: "Black Tea",
        collection: "Black Tea Exclusive Blend",
        flavour: "Citrus",
        packaging: "Loose Leaf Tea",
        size: "100g pack"
      },
      {
        id: 1,
        name: "Longevity Tea",
        description: "Delicate white tea blend with floral mineral finish",
        price: 17,
        quantity: 2,

        skuId: "TCTWG4048M",
        teaType: "White Tea",
        collection: "Exclusive Tea Blend",
        flavour: "Floral, Mineral",
        packaging: "Loose Leaf Tea",
        size: "10g pack"
      }
    ],

    subtotal: 82,
    tax: 7.38,
    total: 89.38
  },

  hist2: {
    id: "TWG-SG-95018376",
    date: "11-04-2026",
    time: "18:45:03",
    associate: "Olivia Tan",
    branch: "TWG Tea Raffles City",
    currency: "SGD",

    items: [
      {
        id: 0,
        name: "Mate",
        description: "Herbal infusion with earthy vegetal character",
        price: 10,
        quantity: 3,

        skuId: "T8101",
        teaType: "Herbal Tea",
        collection: "Loose Leaf Tea",
        flavour: "Herbaceous",
        packaging: "Loose Leaf Tea",
        size: "50g pack"
      },
      {
        id: 1,
        name: "Sapitwa Cloud Tea",
        description: "Malty single estate blue tea with smooth depth",
        price: 42,
        quantity: 1,

        skuId: "T1007",
        teaType: "Blue Tea / Oolong",
        collection: "Single Estate Tea",
        flavour: "Malty",
        packaging: "Loose Leaf Tea",
        size: "50g pack"
      }
    ],

    subtotal: 72,
    tax: 6.48,
    total: 78.48
  }

};

const currentReceipt = receipts[currentReceiptId]

const totalSlides = 2

const transactionHistory = [
  {
    id: "current",
    date: "05-05-2026",
    branch: "TWG Tea Marina Bay Sands",
    amount: currentReceiptId === "current"
      ? receipts.current.subtotal + receipts.current.tax
      : 267.05,
  },
  {
    id: "hist1",
    date: "22-04-2026",
    branch: "TWG Tea Takashimaya",
    amount: 89.38,
  },
  {
    id: "hist2",
    date: "11-04-2026",
    branch: "TWG Tea Raffles City",
    amount: 78.48,
  },
]
  
  const toggleProductExpansion = (productId: number) => {
    setExpandedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const toggleItemFeedback = (itemId) => {
  setExpandedItemFeedback((prev) =>
    prev.includes(itemId)
      ? prev.filter((id) => id !== itemId)
      : [...prev, itemId]
  )
}

  const setItemRating = (itemId, rating) => {
  setItemFeedback((prev) => ({
    ...prev,
    [currentReceipt.id]: {
      ...(prev[currentReceipt.id] || {}),
      [itemId]: {
        ...(prev[currentReceipt.id]?.[itemId] || {}),
        rating
      }
    }
  }))
}
  const toggleItemTag = (itemId, tag) => {
  setItemFeedback((prev) => {
    const receiptData = prev[currentReceipt.id] || {}
    const itemData = receiptData[itemId] || {}

    const currentTags = itemData.tags || []

    const updatedTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag]

    return {
      ...prev,
      [currentReceipt.id]: {
        ...receiptData,
        [itemId]: {
          ...itemData,
          tags: updatedTags
        }
      }
    }
  })
}
  useEffect(() => {
  setExpandedItemFeedback([])
  setExpandedProducts([])
}, [currentReceipt.id])
  const handleProfileUpdate = () => {
    setProfileUpdateSuccess(true)
    setTimeout(() => setProfileUpdateSuccess(false), 3000)
  }

  const getModalPositionRelativeToContainer = (buttonRef: React.RefObject<HTMLButtonElement>) => {
    if (!buttonRef.current || !receiptContainerRef.current) {
      return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
    }

    const button = buttonRef.current
    const container = receiptContainerRef.current

    const buttonRect = button.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    // Calculate position relative to container
    const relativeTop = buttonRect.top - containerRect.top
    const relativeLeft = buttonRect.left - containerRect.left

    // Modal dimensions (approximate)
    const modalWidth = Math.min(400, containerRect.width - 32)
    const modalHeight = 400

    // Calculate ideal top position (above button, with offset)
    let top = Math.max(16, relativeTop - modalHeight - 8)

    // If modal would go off top, place it below button
    if (top < 16) {
      top = relativeTop + buttonRect.height + 8
    }

    // If still too high, center it vertically
    if (top + modalHeight > containerRect.height) {
      top = Math.max(16, (containerRect.height - modalHeight) / 2)
    }

    // Calculate ideal left position (centered on button)
    let left = relativeLeft + buttonRect.width / 2 - modalWidth / 2

    // Keep modal within horizontal bounds
    left = Math.max(16, Math.min(left, containerRect.width - modalWidth - 16))

    return {
      position: "absolute" as const,
      top: `${top}px`,
      left: `${left}px`,
      width: `${modalWidth}px`,
      maxHeight: "85vh",
    }
  }

  const handleFeedbackModalOpen = () => {
    setShowFeedbackModal(true)
  }

  const handleTransactionHistoryOpen = () => {
    setShowTransactionHistory(true)
  }

  const handleReferModalOpen = () => {
    setShowReferModal(true)
  }

  const handleFeedbackSubmit = () => {
    setFeedbackSubmitted(true)
    setShowFeedbackModal(false)
    setTimeout(() => setFeedbackSubmitted(false), 5000)
  }

  const handleShare = () => {
    handleReferModalOpen()
  }

  const handleEmailReceipt = () => {
    window.open(`mailto:?subject=Receipt from Malabar Gold & Diamonds&body=Receipt ID: ${currentReceipt.id}`)
  }

  const handleDownloadReceipt = () => {
    const receiptContent = `
 <!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Malabar Gold & Diamonds Receipt</title>

<style>

*{margin:0;padding:0;box-sizing:border-box;}

body{
font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;
font-size:14px;
line-height:1.4;
color:#000;
background:#fff;
width:800px;
margin:0 auto;
padding:20px;
}

/* HEADER */

.receipt-header{
display:flex;
justify-content:space-between;
align-items:flex-start;
margin-bottom:30px;
padding-bottom:20px;
border-bottom:3px solid #CE187D;
}

.company-info h1{
font-size:30px;
color:#682A49;
font-weight:900;
margin-bottom:6px;
}

.company-info p{
font-size:12px;
color:#444;
line-height:1.4;
font-weight:500;
}

.bill-info{
text-align:right;
font-size:12px;
}

.bill-info div{
margin-bottom:4px;
}

.bill-id{
font-weight:bold;
color:#CE187D;
}

/* CUSTOMER */

.customer-section{
background:#F7F2F5;
padding:15px;
margin-bottom:20px;
border-left:4px solid #CE187D;
border-radius:0 8px 8px 0;
}

.customer-section h3{
color:#682A49;
font-size:16px;
margin-bottom:2px;
font-weight:700;
}

.customer-section p{
font-size:12px;
font-weight:500;
color:#555;
}

/* TABLE */

.items-table{
width:100%;
border-collapse:collapse;
margin-bottom:20px;
}

.items-table th{
background:#CE187D;
color:white;
padding:12px 8px;
text-align:left;
font-size:11px;
font-weight:bold;
text-transform:uppercase;
letter-spacing:0.5px;
}

.items-table td{
padding:12px 8px;
border-bottom:1px solid #eee;
font-size:12px;
vertical-align:top;
}

.item-name{
font-weight:700;
margin-bottom:3px;
font-size:13px;
}

.item-desc{
font-size:11px;
color:#777;
}

/* TOTALS */

.totals-section{
display:flex;
justify-content:space-between;
margin-bottom:25px;
padding:0 10px;
}

.totals-table{
text-align:right;
min-width:220px;
}

.totals-table div{
margin-bottom:6px;
font-size:13px;
}

.net-total{
font-weight:800;
font-size:18px;
color:#CE187D;
border-top:2px solid #CE187D;
padding-top:8px;
margin-top:8px;
}

/* PAYMENT */

.payment-box{
background:#F7F2F5;
border:1px solid #ecd9e4;
padding:14px;
border-radius:10px;
display:flex;
justify-content:space-between;
align-items:center;
margin-top:10px;
}

.payment-title{
font-weight:700;
font-size:13px;
color:#333;
}

.payment-sub{
font-size:11px;
color:#777;
}

.payment-amount{
font-weight:800;
font-size:16px;
color:#000;
}

/* FOOTER */

.footer{
text-align:center;
margin-top:40px;
padding-top:20px;
border-top:1px dashed #ccc;
font-size:12px;
color:#444;
}

.footer strong{
color:#682A49;
}

.powered-by{
margin-top:15px;
font-size:10px;
font-weight:700;
color:#999;
text-transform:uppercase;
}

@media print{
body{-webkit-print-color-adjust:exact;width:100%;padding:0;}
}

</style>
</head>

<body>

<div class="receipt-header">

<div class="company-info">

<h1>Malabar Gold & Diamonds</h1>

<p>
<strong>Malabar Gold & Diamonds</strong><br>
No 52, opposite Metro Station MG Road<br>
Bengaluru, Karnataka 560001<br>
India
</p>

</div>

<div class="bill-info">
<div><strong>Receipt ID:</strong> <span class="bill-id">MGD-IN-BLR-71922864</span></div>
<div><strong>Date:</strong> 07-11-2026 19:22</div>
<div><strong>Sales Associate:</strong> Rahul Verma</div>
</div>

</div>


<div class="customer-section">
<h3>Customer: ${customerName}</h3>
<p>Thank you for shopping with Malabar Gold & Diamonds.</p>
</div>


<table class="items-table">

<thead>
<tr>
<th style="width:55%">Jewellery Item</th>
<th style="width:10%">Qty</th>
<th style="width:15%">Category</th>
<th style="width:20%">Amount</th>
</tr>
</thead>

<tbody>

<tr>
<td>
<div class="item-name">Stately Viridescent Generic Gold Necklace</div>
<div class="item-desc">Premium handcrafted gold necklace</div>
</td>
<td>1</td>
<td>Necklace</td>
<td><strong>₹81,998.00</strong></td>
</tr>

<tr>
<td>
<div class="item-name">Avant-garde Gold Earrings</div>
<div class="item-desc">Designer gold earrings set</div>
</td>
<td>1</td>
<td>Earrings</td>
<td><strong>₹44,036.00</strong></td>
</tr>

</tbody>

</table>


<div class="totals-section">

<div>
Items Purchased: 2
</div>

<div class="totals-table">
<div>Subtotal: <strong>₹120,463.59</strong></div>
<div>GST (3%): <strong>₹3,670.90</strong></div>
<div class="net-total">Total Paid: <strong>₹126,034.00</strong></div>
</div>

</div>


<div class="payment-box">

<div>
<div class="payment-title">UPI PAYMENT</div>
<div class="payment-sub">Paid via Google Pay</div>
</div>

<div class="payment-amount">
₹126,034.00
</div>

</div>


<div class="footer">

<p><strong>Thank you for shopping with Malabar Gold & Diamonds!</strong></p>

<p>Visit again at www.malabargoldanddiamonds.com</p>

<div class="powered-by">
Powered by RDEP
</div>

</div>

</body>
</html>    `

    const blob = new Blob([receiptContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "MalabarG&D_Receipt_SK251107001.html"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleWhatsApp = () => {
    window.open("https://wa.me/+919620921294", "_blank")
  }

  const handleCall = () => {
    window.open("tel:+919620921294", "_blank")
  }

  const handleEmail = () => {
    window.open("mailto:sagar.p@proenx.com", "_blank")
  }

  const handleSocialLink = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div
        id="receipt-root"
        ref={receiptContainerRef}
        className="w-full max-w-md mx-auto bg-white shadow-lg relative overflow-hidden"
      >
        <div className="flex flex-col w-full gap-3 pb-4 px-3">
         {/* Top Section - TWG Tea Premium Header */}

<div className="rounded-[22px] border border-[#e5dcc3] mt-3 font-poppins overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)]">

  {/* Premium Header */}
  <div className="bg-[#887345] px-5 pt-5 pb-4">

    <div className="flex items-start justify-between">

      {/* Logo */}
      <div className="bg-[#ede7cf] rounded-2xl px-4 py-3 border border-[#cdbb87] shadow-sm inline-flex">
        <img
          src="/images/design-mode/twg_oval.png"
          alt="TWG Tea"
          className="h-12 w-auto object-contain"
        />
      </div>

      {/* QR */}
      <div className="bg-[#9a8450] p-2.5 rounded-xl border border-[#b39a63]">
        <Image
          src="/images/design-mode/qr-code.jpg"
          alt="Scan QR"
          width={62}
          height={62}
          className="object-contain rounded-md"
        />
      </div>

    </div>

    {/* Greeting + Total */}
    <div className="flex items-center justify-between mt-5">

      <div className="bg-[#9a8450] px-5 py-2.5 rounded-full flex items-center border border-[#b39a63]">

        <User2 className="h-4 w-4 mr-2 text-[#ede7cf]" />

        <span className="text-sm font-medium text-[#f6f1df]">
          Welcome, {customerName}
        </span>

      </div>

     <div className="bg-[#f8f4e8] px-4 py-3 rounded-2xl text-right border border-[#d8ccaa] min-w-[145px]">

  <div className="text-[10px] font-semibold text-[#887345] uppercase tracking-[0.24em]">
    Total Paid
  </div>

  <div className="text-xl font-semibold text-[#5f4f2c] mt-0.5">
    S${currentReceipt.total.toFixed(2)}
  </div>

</div>

    </div>

  </div>

  {/* Receipt Info Section */}
  <div className="grid grid-cols-2 gap-4 p-4 bg-[#f8f5ea]">

    <div className="bg-white p-3.5 rounded-2xl border border-[#e6dcc0]">

      <div className="text-[10px] text-[#a39267] uppercase font-semibold tracking-[0.22em]">
        Receipt ID
      </div>

      <div className="text-xs font-mono font-semibold text-[#5f4f2c] mt-1">
        {currentReceipt.id}
      </div>

    </div>

    <div className="bg-white p-3.5 rounded-2xl border border-[#e6dcc0]">

      <div className="text-[10px] text-[#a39267] uppercase font-semibold tracking-[0.22em]">
        Date & Time
      </div>

      <div className="text-xs font-medium text-[#5f4f2c] mt-1">
        {currentReceipt.date}

        <span className="text-[#d2c5a0] mx-1.5">•</span>

        {currentReceipt.time}
      </div>

    </div>

  </div>

</div>
          
         {/* Purchase Details */}
<div className="bg-white rounded-[22px] border border-[#e5dcc3] p-3 font-poppins shadow-[0_2px_10px_rgba(0,0,0,0.03)]">

  {/* Section Header */}
  <div className="flex items-center justify-between mb-3">

    <h3 className="text-base font-semibold flex items-center text-[#5f4f2c]">

      <ShoppingBagIcon className="mr-2 h-4 w-4 text-[#887345]" />

      Purchase Details

    </h3>

    <Badge
      variant="outline"
      className="text-[10px] border-[#cdbb87] text-[#887345] font-medium bg-[#faf7ef]"
    >
      {currentReceipt.items.length} Items
    </Badge>

  </div>


  <div className="space-y-2.5">

    {currentReceipt.items.map((product) => (

      <div
        key={product.id}
        className="border border-[#ece3cc] rounded-[18px] overflow-hidden bg-[#fffdfa]"
      >


        {/* Item Header */}
        <div
          className="flex items-center justify-between p-3 bg-[#faf7ef] cursor-pointer"
          onClick={() => toggleProductExpansion(product.id)}
        >

          <div className="flex items-center flex-1">

            <ChevronRight
              className={`h-3.5 w-3.5 mr-2 text-[#887345] transition-transform duration-200 ${
                expandedProducts.includes(product.id) ? "rotate-90" : ""
              }`}
            />

            <div className="flex-1">

              <span className="font-semibold text-[15px] text-[#4f4123]">
                {product.name}
              </span>

              <div className="text-[10px] font-medium text-[#9d8b60] uppercase tracking-[0.18em] mt-0.5">
                {product.teaType}
              </div>

            </div>

          </div>


          <div className="flex items-center space-x-3 text-right">

            <div className="text-xs font-medium text-[#9d8b60]">
              x{product.quantity}
            </div>

            <div className="font-bold text-[15px] text-[#4f4123]">
              S${(product.price * product.quantity).toFixed(2)}
            </div>

          </div>

        </div>


        {/* Expanded Details */}
        {expandedProducts.includes(product.id) && (

          <div className="bg-white px-3 pb-3 pt-2 border-t border-[#f1ead8]">

            {/* Description */}
            <div className="text-[11px] text-[#7a6a45] leading-relaxed mb-3">
              {product.description}
            </div>

            {/* Product Metadata */}
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[11px] font-medium text-[#6f603d]">

              <div className="flex justify-between border-b border-[#f5efdf] pb-1">
                <span className="text-[#aa9a70]">SKU</span>
                <span>{product.skuId}</span>
              </div>

              <div className="flex justify-between border-b border-[#f5efdf] pb-1">
                <span className="text-[#aa9a70]">Flavour</span>
                <span>{product.flavour}</span>
              </div>

              <div className="flex justify-between border-b border-[#f5efdf] pb-1">
                <span className="text-[#aa9a70]">Packaging</span>
                <span>{product.packaging}</span>
              </div>

              <div className="flex justify-between border-b border-[#f5efdf] pb-1">
                <span className="text-[#aa9a70]">Size</span>
                <span>{product.size}</span>
              </div>

              <div className="flex justify-between border-b border-[#f5efdf] pb-1 col-span-2">
                <span className="text-[#aa9a70]">Collection</span>
                <span>{product.collection}</span>
              </div>

            </div>

          </div>

        )}


        {/* Tea Feedback Toggle */}
        <div className="px-3 pb-2 pt-1">

          <button
            onClick={() => toggleItemFeedback(product.id)}
            className="text-[11px] text-[#887345] font-semibold"
          >
            {expandedItemFeedback.includes(product.id)
              ? "Hide tea feedback"
              : "Rate this tea"}
          </button>

        </div>


        {/* Feedback Panel */}
        {expandedItemFeedback.includes(product.id) && (

          <div className="mx-3 mb-3 p-3 border border-[#ece3cc] rounded-[18px] bg-[#faf7ef]">


            {/* Rating */}
            <div className="flex justify-center gap-2 mb-3">

              {[1,2,3,4,5].map((star) => (

                <button
                  key={star}
                  onClick={() => setItemRating(product.id, star)}
                >

                  <Star
                    className={`h-4 w-4 ${
                      star <=
                      (itemFeedback[currentReceipt.id]?.[product.id]?.rating || 0)
                        ? "fill-[#887345] text-[#887345]"
                        : "text-[#d8ccb0]"
                    }`}
                  />

                </button>

              ))}

            </div>


            {/* Tea Experience Tags */}
            <div className="flex flex-wrap gap-2 justify-center">

              {[
                "Aromatic",
                "Refreshing",
                "Smooth",
                "Balanced",
                "Premium Blend"
              ].map((tag) => {

                const active =
                  itemFeedback[currentReceipt.id]?.[product.id]?.tags?.includes(tag)

                return (

                  <button
                    key={tag}
                    onClick={() => toggleItemTag(product.id, tag)}
                    className={`text-[10px] px-2.5 py-1 rounded-full border transition-colors ${
                      active
                        ? "bg-[#887345] text-white border-[#887345]"
                        : "border-[#d9cda9] text-[#7a6a45] bg-white"
                    }`}
                  >
                    {tag}
                  </button>

                )

              })}

            </div>

          </div>

        )}

      </div>

    ))}

  </div>


  {/* Totals */}
  <div className="mt-4 space-y-2 border-t border-dashed border-[#d9ccb0] pt-4">

    <div className="flex justify-between text-xs font-medium text-[#8f7f58]">
      <span>Subtotal</span>
      <span>S${currentReceipt.subtotal.toFixed(2)}</span>
    </div>

    <div className="flex justify-between text-xs font-medium text-[#8f7f58]">
      <span>GST (9%)</span>
      <span>S${currentReceipt.tax.toFixed(2)}</span>
    </div>

    <div className="flex justify-between text-base font-bold border-t border-[#eee5cf] pt-2 mt-1">

      <span className="text-[#4f4123]">
        Total Paid
      </span>

      <span className="text-[#887345]">
        S${currentReceipt.total.toFixed(2)}
      </span>

    </div>

  </div>


  {/* Payment */}
  <div className="pt-3">

    <div className="mt-2 p-3 bg-[#faf7ef] rounded-[18px] border border-[#ece3cc]">

      <div className="flex items-center justify-between">

        <div className="flex items-center">

          <div className="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center mr-3 border border-[#ece3cc]">

            <svg
              className="w-4 h-4 text-[#887345]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>

          </div>

          <div>

            <div className="text-[11px] font-bold text-[#4f4123] uppercase tracking-tight">
              Card Payment
            </div>

            <div className="text-[10px] font-medium text-[#9d8b60]">
              Paid via Visa Signature
            </div>

          </div>

        </div>

        <div className="text-sm font-bold text-[#4f4123]">
          S${currentReceipt.total.toFixed(2)}
        </div>

      </div>

    </div>

  </div>

</div>

          {/* Customer Experience Feedback */}
<div className="bg-white rounded-[22px] border border-[#e5dcc3] p-4 font-poppins shadow-[0_2px_10px_rgba(0,0,0,0.03)]">

  {feedbackSubmitted ? (

    <div className="text-center py-6 bg-[#faf7ef] rounded-[20px] border border-[#ece3cc]">

      <div className="w-12 h-12 bg-[#887345] rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">

        <ThumbsUp className="h-6 w-6 text-white" />

      </div>

      <div className="text-sm font-bold text-[#5f4f2c] mb-1">
        Thank You for Your Feedback
      </div>

      <div className="text-xs font-medium text-[#9d8b60]">
        Your feedback helps us refine your next tea experience.
      </div>

    </div>

  ) : (

    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">

        <h3 className="text-base font-semibold text-[#5f4f2c]">
          Rate Your Tea Experience
        </h3>

        <span className="text-[10px] font-bold text-[#887345] bg-[#faf7ef] border border-[#e5dcc3] px-2 py-1 rounded-full tracking-[0.12em]">
          FEEDBACK
        </span>

      </div>


      {/* Rating */}
      <div className="flex justify-center gap-3 py-2">

        {[1, 2, 3, 4, 5].map((star) => (

          <button
            key={star}
            onClick={() => setRating(star)}
            className="transition-transform active:scale-90"
          >

            <Star
              className={`h-8 w-8 transition-colors ${
                star <= rating
                  ? "fill-[#887345] text-[#887345]"
                  : "text-[#ddd3ba]"
              }`}
            />

          </button>

        ))}

      </div>


      {/* Experience Tags */}
      <div className="flex flex-wrap justify-center gap-2">

        {[
          "Excellent Service",
          "Premium Quality",
          "Beautiful Packaging",
          "Fresh Aroma",
          "Great Ambience"
        ].map((tag) => (

          <button
            key={tag}
            className="text-[10px] px-3 py-1.5 rounded-full border border-[#d8ccaa] text-[#7a6a45] bg-[#faf7ef]"
          >
            {tag}
          </button>

        ))}

      </div>


      {/* Feedback Text */}
      <div className="space-y-2">

        <Label
          htmlFor="comments"
          className="text-[11px] font-bold text-[#9d8b60] uppercase tracking-[0.12em] ml-1"
        >
          Share Your Experience (Optional)
        </Label>

        <textarea
          id="comments"
          rows={3}
          placeholder="How was your tea selection and boutique experience today?"
          className="w-full p-3 text-xs border border-[#e5dcc3] rounded-[18px] bg-[#fffdfa] focus:ring-1 focus:ring-[#887345] focus:border-[#887345] outline-none transition-all resize-none text-[#5f4f2c] placeholder:text-[#b8ab84]"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        />

      </div>


      {/* Submit */}
      <Button
        className="w-full bg-[#887345] hover:bg-[#7b683d] text-white h-11 text-xs font-bold rounded-[18px] transition-all"
        onClick={handleFeedbackSubmit}
        disabled={!rating}
      >
        Submit Feedback
      </Button>


      <p className="text-[10px] text-center text-[#a39267] font-medium">
        Your feedback helps us craft better tea experiences.
      </p>

    </div>

  )}

</div>
          
          {/* MyTWG Loyalty Programme */}
<div className="bg-white rounded-[22px] border border-[#e5dcc3] p-4 font-poppins shadow-[0_2px_10px_rgba(0,0,0,0.03)]">

  {/* Header */}
  <div className="flex items-center justify-between mb-4">

    <div className="flex items-center">

      <div className="w-10 h-10 rounded-full bg-[#faf7ef] border border-[#e5dcc3] flex items-center justify-center mr-3">

        <Award className="h-5 w-5 text-[#887345]" />

      </div>

      <div>

        <h3 className="text-base font-semibold text-[#5f4f2c]">
          MyTWG Membership
        </h3>

        <div className="text-[10px] uppercase tracking-[0.18em] text-[#a39267] font-semibold mt-0.5">
          Loyalty Programme
        </div>

      </div>

    </div>

    <Badge
      variant="outline"
      className="text-[10px] border-[#d8ccaa] text-[#887345] bg-[#faf7ef] font-medium"
    >
      ACTIVE MEMBER
    </Badge>

  </div>


  {/* Membership Card */}
  <div className="rounded-[22px] bg-[#887345] p-4 border border-[#9b8750] relative overflow-hidden">

    <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-white/5 -mr-10 -mt-10" />

    <div className="relative z-10">

      <div className="flex items-start justify-between">

        <div>

          <div className="text-[#f4eedc] text-[11px] uppercase tracking-[0.22em] font-medium">
            Membership ID
          </div>

          <div className="text-white text-lg font-semibold mt-1 tracking-[0.04em]">
            MTWG-4582-1193
          </div>

        </div>

        <img
          src="/images/design-mode/twg_oval.png"
          alt="TWG Tea"
          className="h-10 w-auto object-contain opacity-90"
        />

      </div>


      <div className="mt-5 flex items-end justify-between">

        <div>

          <div className="text-[#f4eedc] text-[10px] uppercase tracking-[0.18em]">
            Member
          </div>

          <div className="text-white text-sm font-medium mt-1">
            {customerName}
          </div>

        </div>

        <div className="text-right">

          <div className="text-[#f4eedc] text-[10px] uppercase tracking-[0.18em]">
            Country
          </div>

          <div className="text-white text-sm font-medium mt-1">
            Singapore
          </div>

        </div>

      </div>

    </div>

  </div>


  {/* Benefits */}
  <div className="mt-4 space-y-2.5">

    <div className="flex items-start bg-[#faf7ef] border border-[#ece3cc] rounded-[18px] p-3">

      <div className="w-8 h-8 rounded-full bg-white border border-[#e5dcc3] flex items-center justify-center mr-3 flex-shrink-0">

        <ShoppingBag className="h-4 w-4 text-[#887345]" />

      </div>

      <div>

        <div className="text-sm font-semibold text-[#5f4f2c]">
          Earn Rewards on Purchases
        </div>

        <div className="text-[11px] text-[#8f7f58] mt-1 leading-relaxed">
          Every dollar transacted at participating TWG Tea Salons & Boutiques contributes towards rewards and membership benefits.
        </div>

      </div>

    </div>


    <div className="flex items-start bg-[#faf7ef] border border-[#ece3cc] rounded-[18px] p-3">

      <div className="w-8 h-8 rounded-full bg-white border border-[#e5dcc3] flex items-center justify-center mr-3 flex-shrink-0">

        <Gift className="h-4 w-4 text-[#887345]" />

      </div>

      <div>

        <div className="text-sm font-semibold text-[#5f4f2c]">
          Exclusive Member Offers
        </div>

        <div className="text-[11px] text-[#8f7f58] mt-1 leading-relaxed">
          Receive access to selected rewards, offers and seasonal privileges available through the MyTWG programme.
        </div>

      </div>

    </div>


    <div className="flex items-start bg-[#faf7ef] border border-[#ece3cc] rounded-[18px] p-3">

      <div className="w-8 h-8 rounded-full bg-white border border-[#e5dcc3] flex items-center justify-center mr-3 flex-shrink-0">

        <Globe className="h-4 w-4 text-[#887345]" />

      </div>

      <div>

        <div className="text-sm font-semibold text-[#5f4f2c]">
          International Participation
        </div>

        <div className="text-[11px] text-[#8f7f58] mt-1 leading-relaxed">
          Membership purchases are supported across participating TWG Tea locations and online shopping regions.
        </div>

      </div>

    </div>

  </div>


  {/* Footer Note */}
  <div className="mt-4 pt-4 border-t border-dashed border-[#ddd2b5]">

    <div className="text-[10px] leading-relaxed text-[#9d8b60] text-center">
      Membership benefits, rewards and programme eligibility are subject to MyTWG Membership Terms & Conditions.
    </div>

  </div>

</div>
          
          {/* Full Width Banner Section */}
<div className="bg-white rounded-lg border border-gray-200 overflow-hidden font-poppins relative">
  <Carousel
    className="w-full"
    setApi={setPromoApi}
    opts={{
      loop: true,
    }}
  >
    <CarouselContent>

      {/* Banner 1 */}
      <CarouselItem>
        <a
          href="https://www.malabargoldanddiamonds.com/in/pan-india/en/product-list.html?search=tanvika"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="relative w-full aspect-[1440/650]">
            <Image
              src="/images/design-mode/malabar-banner-1.png"
              alt="Malabar Tanvika Collection"
              fill
              className="object-cover"
              priority
            />
          </div>
        </a>
      </CarouselItem>

      {/* Banner 2 */}
      <CarouselItem>
        <a
          href="https://www.malabargoldanddiamonds.com/in/pan-india/en/product-list/necklace.html?malabar_category=2076&malabar_product_type=72"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="relative w-full aspect-[1440/650]">
            <Image
              src="/images/design-mode/malabar-banner-2.png"
              alt="Malabar Necklace Collection"
              fill
              className="object-cover"
            />
          </div>
        </a>
      </CarouselItem>

      {/* Banner 3 */}
      <CarouselItem>
        <a
          href="https://www.malabargoldanddiamonds.com/in/pan-india/en/product-list.html?malabar_category=2076"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="relative w-full aspect-[1440/650]">
            <Image
              src="/images/design-mode/malabar-banner-3.png"
              alt="Malabar Jewellery Collection"
              fill
              className="object-cover"
            />
          </div>
        </a>
      </CarouselItem>

    </CarouselContent>

    {/* Dots Navigation */}
    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
      {[0, 1, 2].map((index) => (
        <button
          key={index}
          onClick={() => promoApi?.scrollTo(index)}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            currentSlide === index ? "w-5 bg-[#D4AF37]" : "w-1.5 bg-gray-300"
          }`}
        />
      ))}
    </div>

  </Carousel>
</div>
          
         {/* Profile Update Section */}
<div className="bg-white rounded-xl border border-[#ecd9e4] p-4 font-poppins shadow-sm">

  {profileUpdateSuccess ? (

    <div className="text-center py-4 bg-[#F7F2F5] rounded-xl border border-[#ecd9e4]">

      <div className="w-12 h-12 bg-[#CE187D]/10 rounded-full flex items-center justify-center mx-auto mb-3">
        <svg className="w-6 h-6 text-[#CE187D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>

      <div className="text-sm font-bold text-[#682A49] mb-1">
        Profile Updated Successfully
      </div>

      <div className="text-[11px] font-semibold text-[#CE187D] uppercase tracking-wider">
        +100 Loyalty Points Added
      </div>

    </div>

  ) : (

    <>
      <div className="flex items-center justify-between mb-4">

        <h3 className="text-base font-semibold text-[#682A49] flex items-center">

          <div className="bg-[#CE187D] p-1.5 rounded-lg mr-2.5">
            <User2 className="h-4 w-4 text-white" />
          </div>

          Complete Your Profile

        </h3>

        <Badge className="text-[10px] font-bold bg-[#CE187D] text-white hover:bg-[#C92C83] border-none px-2 py-0.5">
          +100 PTS
        </Badge>

      </div>

      <div className="space-y-4">

        <div className="grid grid-cols-2 gap-3">

          <div className="space-y-1.5">
            <Label htmlFor="mobile" className="text-[11px] font-bold text-gray-400 uppercase tracking-tight ml-1">
              Mobile Number
            </Label>

            <Input
              id="mobile"
              placeholder="+91 9XXXXXXXXX"
              value={profile.mobile}
              onChange={(e) => setProfile((prev) => ({ ...prev, mobile: e.target.value }))}
              className="h-10 text-xs border-[#ecd9e4] focus:border-[#C92C83] focus:ring-[#C92C83] rounded-lg"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-[11px] font-bold text-gray-400 uppercase tracking-tight ml-1">
              Full Name
            </Label>

            <Input
              id="name"
              placeholder="Your Full Name"
              value={profile.name}
              onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
              className="h-10 text-xs border-[#ecd9e4] focus:border-[#C92C83] focus:ring-[#C92C83] rounded-lg"
            />
          </div>

        </div>

        <div className="space-y-1.5">

          <Label htmlFor="email" className="text-[11px] font-bold text-gray-400 uppercase tracking-tight ml-1">
            Email Address
          </Label>

          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={profile.email}
            onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
            className="h-10 text-xs border-[#ecd9e4] focus:border-[#C92C83] focus:ring-[#C92C83] rounded-lg"
          />

        </div>

        <div className="space-y-1.5">

          <Label htmlFor="gender" className="text-[11px] font-bold text-gray-400 uppercase tracking-tight ml-1">
            Gender
          </Label>

          <Select
            value={profile.gender}
            onValueChange={(value) => setProfile((prev) => ({ ...prev, gender: value }))}
          >

            <SelectTrigger className="h-10 text-xs border-[#ecd9e4] focus:border-[#C92C83] rounded-lg">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="male" className="text-xs">Male</SelectItem>
              <SelectItem value="female" className="text-xs">Female</SelectItem>
              <SelectItem value="other" className="text-xs">Other</SelectItem>
            </SelectContent>

          </Select>

        </div>

        <Button
          className="w-full bg-gradient-to-r from-[#CE187D] to-[#682A49] hover:opacity-90 text-white h-11 text-xs font-bold rounded-xl shadow-lg shadow-pink-100 transition-all active:scale-[0.98]"
          onClick={handleProfileUpdate}
        >
          Update Profile & Earn 100 Points
        </Button>

      </div>

    </>

  )}

</div>
          
          
      {/* Malabar Services & Promise */}
<div className="bg-white rounded-xl border border-[#ecd9e4] p-4 font-poppins shadow-sm">

  <div className="flex items-center justify-between mb-4">
    <h3 className="text-base font-bold text-[#682A49] flex items-center">
      <Sparkles className="mr-2 h-4 w-4 text-[#CE187D]" />
      Malabar Promise
    </h3>

    <span className="text-[10px] font-bold text-[#CE187D] uppercase tracking-tight">
      Trusted Jewellery
    </span>
  </div>


  {/* Bridal Assistance Banner */}
  <a
    href="https://www.malabargoldanddiamonds.com/in/pan-india/en/book-an-appointment.html"
    target="_blank"
    rel="noopener noreferrer"
    className="block mb-4 rounded-xl overflow-hidden border border-[#ecd9e4]"
  >
    <Image
      src="/images/design-mode/bride-assistance.png"
      alt="Malabar Bridal Assistance"
      width={1200}
      height={500}
      className="w-full h-auto object-cover"
    />
  </a>


  {/* Promise Points */}
  <div className="space-y-3">

    {/* Transparency */}
    <div className="flex items-start gap-3 bg-[#F7F2F5] p-3 rounded-lg border border-[#ecd9e4]">
      <div className="w-7 h-7 rounded-full bg-[#CE187D]/10 flex items-center justify-center text-[#CE187D] text-xs font-bold">
        ✓
      </div>

      <div>
        <div className="text-xs font-semibold text-[#682A49]">
          Complete Transparency
        </div>
        <div className="text-[11px] text-gray-500">
          Detailed invoice showing gross weight, stone weight and net gold weight for every jewellery piece.
        </div>
      </div>
    </div>


    {/* Lifetime Maintenance */}
    <div className="flex items-start gap-3 bg-[#F7F2F5] p-3 rounded-lg border border-[#ecd9e4]">
      <div className="w-7 h-7 rounded-full bg-[#CE187D]/10 flex items-center justify-center text-[#CE187D] text-xs font-bold">
        ✓
      </div>

      <div>
        <div className="text-xs font-semibold text-[#682A49]">
          Assured Lifetime Maintenance
        </div>
        <div className="text-[11px] text-gray-500">
          Complimentary lifetime maintenance available at any of our 410+ showrooms across 14 countries.
        </div>
      </div>
    </div>


    {/* Hallmark Gold */}
    <div className="flex items-start gap-3 bg-[#F7F2F5] p-3 rounded-lg border border-[#ecd9e4]">
      <div className="w-7 h-7 rounded-full bg-[#CE187D]/10 flex items-center justify-center text-[#CE187D] text-xs font-bold">
        ✓
      </div>

      <div>
        <div className="text-xs font-semibold text-[#682A49]">
          BIS 916 Hallmarked Pure Gold
        </div>
        <div className="text-[11px] text-gray-500">
          All gold jewellery is guaranteed with 100% HUID hallmarking for certified purity.
        </div>
      </div>
    </div>


    {/* Natural Diamonds */}
    <div className="flex items-start gap-3 bg-[#F7F2F5] p-3 rounded-lg border border-[#ecd9e4]">
      <div className="w-7 h-7 rounded-full bg-[#CE187D]/10 flex items-center justify-center text-[#CE187D] text-xs font-bold">
        ✓
      </div>

      <div>
        <div className="text-xs font-semibold text-[#682A49]">
          Certified Natural Diamonds
        </div>
        <div className="text-[11px] text-gray-500">
          Every diamond undergoes 28 strict quality checks before reaching our customers.
        </div>
      </div>
    </div>

  </div>

</div>
          
         {/* Receipt Actions */}
<div className="bg-white rounded-xl border border-[#ecd9e4] p-3 font-poppins shadow-sm">
  <div className="flex justify-center space-x-4">

    <Button
      ref={historyButtonRef}
      variant="ghost"
      size="sm"
      className="text-[#CE187D] hover:bg-[#F7F2F5] font-medium"
      onClick={handleTransactionHistoryOpen}
    >
      <History className="h-4 w-4 mr-1" />
      <span className="text-xs">History</span>
    </Button>

    <Button
      variant="ghost"
      size="sm"
      className="text-[#CE187D] hover:bg-[#F7F2F5] font-medium"
      onClick={handleEmailReceipt}
    >
      <Mail className="h-4 w-4 mr-1" />
      <span className="text-xs">Email</span>
    </Button>

    <Button
      variant="ghost"
      size="sm"
      className="text-[#CE187D] hover:bg-[#F7F2F5] font-medium"
      onClick={handleDownloadReceipt}
    >
      <Download className="h-4 w-4 mr-1" />
      <span className="text-xs">Download</span>
    </Button>

  </div>
</div>
          
          {/* Need Help */}
<div className="bg-white rounded-xl border border-[#ecd9e4] p-3 font-poppins shadow-sm">
  <h3 className="text-sm font-semibold text-[#682A49] mb-3 flex items-center">
    <Send className="mr-2 h-4 w-4 text-[#CE187D]" />
    Need Help?
  </h3>

  <div className="grid grid-cols-3 gap-2">

    {/* WhatsApp / Chat */}
    <button
      onClick={handleWhatsApp}
      className="bg-[#F7F2F5] border border-[#ecd9e4] rounded-lg p-2 flex flex-col items-center hover:bg-[#F1E6EC] transition-colors group"
    >
      <MessageSquare className="h-4 w-4 text-gray-600 group-hover:text-[#CE187D] mb-1" />
      <span className="text-[11px] font-medium text-gray-700">Chat</span>
    </button>

    {/* Call Support */}
    <button
      onClick={handleCall}
      className="bg-[#F7F2F5] border border-[#ecd9e4] rounded-lg p-2 flex flex-col items-center hover:bg-[#F1E6EC] transition-colors group"
    >
      <Phone className="h-4 w-4 text-gray-600 group-hover:text-[#CE187D] mb-1" />
      <span className="text-[11px] font-medium text-gray-700">Call</span>
    </button>

    {/* Email Support */}
    <button
      onClick={handleEmail}
      className="bg-[#F7F2F5] border border-[#ecd9e4] rounded-lg p-2 flex flex-col items-center hover:bg-[#F1E6EC] transition-colors group"
    >
      <Mail className="h-4 w-4 text-gray-600 group-hover:text-[#CE187D] mb-1" />
      <span className="text-[11px] font-medium text-gray-700">Email</span>
    </button>

  </div>
</div>
          
      {/* Social Media & Store Address */}
<div className="bg-white rounded-xl border border-[#ecd9e4] p-3 font-poppins">

  <div className="flex justify-center space-x-6 mb-3">

    <button
      onClick={() => handleSocialLink("https://www.instagram.com/malabargoldanddiamonds/?hl=en")}
      className="flex flex-col items-center"
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 flex items-center justify-center mb-1">
        <Instagram className="h-4 w-4 text-white" />
      </div>
      <span className="text-xs font-medium">Instagram</span>
    </button>

    <button
      onClick={() => handleSocialLink("https://www.facebook.com/malabargoldanddiamonds/")}
      className="flex flex-col items-center"
    >
      <div className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center mb-1">
        <Facebook className="h-4 w-4 text-white" />
      </div>
      <span className="text-xs font-medium">Facebook</span>
    </button>

    <button
      onClick={() => handleSocialLink("https://www.malabargoldanddiamonds.com/")}
      className="flex flex-col items-center"
    >
      <div className="w-8 h-8 rounded-full bg-[#CE187D] flex items-center justify-center mb-1">
        <ExternalLink className="h-4 w-4 text-white" />
      </div>
      <span className="text-xs font-medium">Website</span>
    </button>

  </div>


  {/* Collapsible Store Location */}
  <div className="text-xs text-gray-600 text-center mb-3 bg-[#F7F2F5] p-3 rounded-lg">

    <button
      onClick={() => setShowStoreLocation(!showStoreLocation)}
      className="w-full flex items-center justify-center mb-2 hover:text-[#CE187D] transition-colors"
    >
      <MapPin className="h-3 w-3 mr-1 text-[#CE187D]" />
      <span className="font-semibold text-[#682A49]">
        Malabar Gold & Diamonds Store {showStoreLocation ? "▲" : "▼"}
      </span>
    </button>

    {showStoreLocation && (
      <div className="space-y-0.5">

        <p className="font-bold text-gray-900">
          Malabar Gold & Diamonds
        </p>

        <p>No 52, opposite Metro Station MG Road</p>
        <p>Bengaluru, Karnataka 560001</p>
        <p>India</p>

        <p className="mt-2 text-[10px]">
          GSTIN: 29AACCM5471H1Z9
        </p>

        <p className="mt-1 text-[#CE187D] font-semibold">
          Sales Associate: {currentReceipt.associate}
        </p>

      </div>
    )}

  </div>


  {/* Compact Terms */}
  <Button
    variant="ghost"
    size="sm"
    className="w-full text-xs text-gray-500 hover:text-[#CE187D] h-6 font-medium"
    onClick={() => setShowTerms(!showTerms)}
  >
    Terms & Conditions {showTerms ? "▲" : "▼"}
  </Button>

  {showTerms && (
    <div className="text-[11px] text-gray-500 mt-2 space-y-1 px-2 font-medium">

      <p>• All jewellery purchases include applicable GST as per Indian regulations.</p>

      <p>• Diamond jewellery is certified as per Malabar quality standards.</p>

      <p>• Lifetime maintenance services available at Malabar stores.</p>

      <p>• © Malabar Gold & Diamonds. All rights reserved.</p>

    </div>
  )}


  {/* Powered by RDEP */}
  <div className="text-center mt-2 pt-2 border-t border-[#ecd9e4]">

    <div className="flex items-center justify-center space-x-1">

      <span className="text-xs text-gray-400 font-medium">
        Powered by
      </span>

      <Image
        src="/images/design-mode/RDEP%20cropped.png"
        alt="RDEP"
        width={60}
        height={16}
        className="object-contain"
      />

    </div>

  </div>

</div>
          <div id="height-marker" style={{ height: "1px" }} />
        </div>

        {/* Feedback Modal */}
        {showFeedbackModal && (
          <div
            style={getModalPositionRelativeToContainer(feedbackButtonRef)}
            className="bg-white rounded-lg w-full overflow-hidden shadow-xl z-[9999] max-w-sm"
          >
            <div className="flex justify-between items-center p-4 border-b bg-blue-700 text-white">
              <h3 className="text-lg font-semibold">How was your shopping experience?</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white"
                onClick={() => setShowFeedbackModal(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </Button>
            </div>

            <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
              {[
                { key: "service", label: "Service Quality" },
                { key: "quality", label: "Product Quality" },
                { key: "style", label: "Shoe Style/Design" },
                { key: "pricing", label: "Value for Money" },
                { key: "store", label: "Store Ambiance" },
              ].map((category) => (
                <div key={category.key} className="flex items-center justify-between">
                  <span className="text-sm">{category.label}</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button
                        key={star}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0"
                        onClick={() =>
                          setFeedback((prev) => ({
                            ...prev,
                            [category.key as keyof typeof feedback]: star,
                          }))
                        }
                      >
                        <Star
                          className={`h-5 w-5 ${
                            feedback[category.key as keyof typeof feedback] >= star
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </Button>
                    ))}
                  </div>
                </div>
              ))}

              <Textarea
                placeholder="Please share your feedback about your purchase (optional)"
                className="mt-2"
                value={feedback.comments}
                onChange={(e) => setFeedback((prev) => ({ ...prev, comments: e.target.value }))}
              />
            </div>

            <div className="p-4 border-t">
              <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white" onClick={handleFeedbackSubmit}>
                Submit Feedback
              </Button>
            </div>
          </div>
        )}

        {/* Transaction History Modal */}
{showTransactionHistory && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center">

    {/* Backdrop */}
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
      onClick={() => setShowTransactionHistory(false)}
    />

    {/* Modal */}
    <div className="relative bg-white rounded-xl w-full max-w-sm overflow-hidden shadow-2xl border border-[#ecd9e4] font-poppins">

      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-[#CE187D] text-white">
        <h3 className="text-base font-bold flex items-center uppercase tracking-tight">
          <History className="h-5 w-5 mr-2" />
          Purchase History
        </h3>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white hover:bg-[#B7156D] rounded-full"
          onClick={() => setShowTransactionHistory(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </Button>
      </div>

      {/* Transaction List */}
      <div className="max-h-80 overflow-y-auto p-3 bg-[#F7F2F5]">
        <div className="space-y-2">

          {transactionHistory.map((transaction) => (

            <button
              key={transaction.id}
              onClick={() => {
                setCurrentReceiptId(transaction.id)
                setShowTransactionHistory(false)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="w-full flex items-center p-3 bg-white border border-[#ecd9e4] rounded-xl shadow-sm hover:border-[#CE187D] transition-all cursor-pointer group"
            >

              <div className="bg-[#F7F2F5] p-2 rounded-lg mr-3 group-hover:bg-[#CE187D] transition-colors">
                <FileText className="h-5 w-5 text-[#CE187D] group-hover:text-white" />
              </div>

              <div className="flex-grow text-left">
                <div className="font-bold text-sm text-gray-900 leading-none mb-1">
                  Malabar G & D
                </div>

                <div className="text-gray-400 text-[11px] font-medium uppercase tracking-tighter">
                  {transaction.date}
                </div>
              </div>

              <div className="font-bold text-[#CE187D]">
                ₹{transaction.amount.toFixed(2)}
              </div>

            </button>

          ))}

        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-[#ecd9e4] bg-white">
        <Button
          className="w-full bg-[#682A49] hover:bg-[#4f1f36] text-white font-bold h-10 rounded-xl transition-all"
          onClick={() => setShowTransactionHistory(false)}
        >
          Close History
        </Button>
      </div>

    </div>
  </div>
)}
        
        {/* Refer & Earn Modal */}
        {showReferModal && (
          <div
            style={getModalPositionRelativeToContainer(referButtonRef)}
            className="bg-white rounded-lg w-full overflow-hidden shadow-xl z-[9999] max-w-sm"
          >
            <div className="flex justify-between items-center p-4 border-b bg-blue-700 text-white">
              <h3 className="text-lg font-semibold flex items-center">
                <Share2 className="h-5 w-5 mr-2" />
                Refer & Earn
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-blue-600"
                onClick={() => setShowReferModal(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </Button>
            </div>
            <div className="p-4 space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Share2 className="h-8 w-8 text-blue-700" />
                </div>
                <h4 className="text-lg font-semibold text-blue-700 mb-2">Share & Earn RM50!</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Refer friends to Skechers and both of you get RM50 off your next purchase!
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="text-xs font-medium text-blue-800 mb-1">Your Referral Code</div>
                <div className="text-lg font-bold text-blue-700 text-center">SKECH{customerName.toUpperCase()}50</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `Try Skechers! Use code SKECH${customerName.toUpperCase()}50 for RM50 off!`,
                    )
                    setShowReferModal(false)
                  }}
                >
                  Copy Code
                </Button>
                <Button
                  className="bg-blue-700 hover:bg-blue-800 text-white"
                  onClick={() => {
                    window.open(
                      `https://wa.me/60362032728?text=Try Skechers Malaysia! Use my code SKECH${customerName.toUpperCase()}50 for RM50 off your next purchase!`,
                    )
                    setShowReferModal(false)
                  }}
                >
                  Share Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
