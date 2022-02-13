import { end, parse } from "iso8601-duration"
import React, { useMemo } from "react"
import { formatAmountWithSymbol } from "../../../utils/prices"
import Badge from "../../fundamentals/badge"
import StatusDot from "../../fundamentals/status-indicator"
import Table from "../../molecules/table"

const getQuotationStatus = (quotation) => {
  if (!quotation.is_disabled) {
    const date = new Date()
    if (new Date(quotation.starts_at) > date) {
      return <StatusDot title="Scheduled" variant="warning" />
    } else if (
      (quotation.ends_at && new Date(quotation.ends_at) < date) ||
      (quotation.valid_duration &&
        date >
          end(parse(quotation.valid_duration), new Date(quotation.starts_at))) ||
      quotation.usage_count === quotation.usage_limit
    ) {
      return <StatusDot title="Expired" variant="danger" />
    } else {
      return <StatusDot title="Active" variant="success" />
    }
  }
  return <StatusDot title="Draft" variant="default" />
}

const getCurrencySymbol = (quotation) => {
  if (quotation.rule.type === "fixed") {
    if (!quotation.regions?.length) {
      return ""
    }
    return (
      <div className="text-grey-50">
        {quotation.regions[0].currency_code.toUpperCase()}
      </div>
    )
  }
  return ""
}

const getquotationAmount = (quotation) => {
  switch (quotation.rule.type) {
    case "fixed":
      if (!quotation.regions?.length) {
        return ""
      }
      return formatAmountWithSymbol({
        currency: quotation.regions[0].currency_code,
        amount: quotation.rule.value,
      })
    case "percentage":
      return `${quotation.rule.value}%`
    case "free_shipping":
      return "Free Shipping"
    default:
      return ""
  }
}

export const useQuotationTableColumns = () => {
  const columns = useMemo(
    () => [
      {
        Header: <Table.HeadCell className="pl-2">Code</Table.HeadCell>,
        accessor: "code",
        Cell: ({ cell: { value }, index }) => (
          <Table.Cell key={index}>
            <Badge variant="default">
              <span className="inter-small-regular">{value}</span>
            </Badge>
          </Table.Cell>
        ),
      },
      {
        Header: "Description",
        accessor: "rule.description",
        Cell: ({ cell: { value }, index }) => (
          <Table.Cell key={index}>{value}</Table.Cell>
        ),
      },
      {
        Header: <div className="text-right">Amount</div>,
        id: "amount",
        Cell: ({ row: { original }, index }) => {
          return (
            <Table.Cell className="text-right" key={index}>
              {getQuotationAmount(original)}
            </Table.Cell>
          )
        },
      },
      {
        Header: <div className="w-[60px]" />,
        id: "currency",
        Cell: ({ row: { original }, index }) => (
          <Table.Cell className="px-2 text-grey-40" key={index}>
            {getCurrencySymbol(original)}
          </Table.Cell>
        ),
      },
      {
        Header: "Status",
        accessor: "ends_at",
        Cell: ({ row: { original }, index }) => (
          <Table.Cell key={index}>{getQuotationStatus(original)}</Table.Cell>
        ),
      },
      {
        Header: () => <div className="text-right">Usage count</div>,
        accessor: "usage_count",
        Cell: ({ cell: { value }, index }) => (
          <Table.Cell className="text-right" key={index}>
            {value}
          </Table.Cell>
        ),
      },
    ],
    []
  )

  return [columns]
}
