import { Router } from "@reach/router"
import { navigate } from "gatsby"
import React from "react"
import PlusIcon from "../../components/fundamentals/icons/plus-icon"
import BodyCard from "../../components/organisms/body-card"
import TableViewHeader from "../../components/organisms/custom-table-header"
import DiscountTable from "../../components/templates/discount-table"
import Details from "./details"
import New from "./new"

const QuotationIndex = () => {
  const actionables = [
    {
      label: "Add Quotation",
      onClick: () => navigate(`/a/quotations/new`),
      icon: <PlusIcon size={20} />,
    },
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="w-full flex flex-col grow">
        <BodyCard
          actionables={actionables}
          customHeader={<TableViewHeader views={["quotations"]} />}
        >
          <DiscountTable />
        </BodyCard>
      </div>
    </div>
  )
}

const Quotations = () => {
  return (
    <Router>
      <QuotationIndex path="/" />
      <Details path=":id" />
      <New path="new" />
    </Router>
  )
}

export default Quotations
