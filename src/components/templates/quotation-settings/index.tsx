import React from "react"
import Checkbox from "../../atoms/checkbox"
import DatePicker from "../../atoms/date-picker/date-picker"
import TimePicker from "../../atoms/date-picker/time-picker"
import AvailabilityDuration from "../../molecules/availability-duration"
import InfoTooltip from "../../molecules/info-tooltip"
import InputField from "../../molecules/input"
import ConnectForm from "../../molecules/nested-form"
import Section from "../../molecules/section"
import Select from "../../molecules/select"
import BodyCard from "../../organisms/body-card"
import RadioGroup from "../../organisms/radio-group"

type QuotationSettingsProps = {
  appliesToAll: boolean
  setAppliesToAll: React.Dispatch<React.SetStateAction<boolean>>
  productOptions: { label: string; value: string }[]
  selectedProducts: { label: string; value: string }[]
  setSelectedProducts: React.Dispatch<
    React.SetStateAction<
      {
        label: string
        value: string
      }[]
    >
  >
  hasExpiryDate: boolean
  setHasExpiryDate: React.Dispatch<React.SetStateAction<boolean>>
  expiryDate?: Date
  setExpiryDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  startDate: Date
  setStartDate: React.Dispatch<React.SetStateAction<Date>>
  availabilityDuration?: string
  setAvailabilityDuration: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
  isFreeShipping: boolean
  setIsFreeShipping: React.Dispatch<React.SetStateAction<boolean>>
  allocationItem?: boolean
  setAllocationItem: React.Dispatch<React.SetStateAction<boolean | undefined>>
  isDynamic: boolean
  isEdit?: boolean
}

const QuotationSettings: React.FC<QuotationSettingsProps> = ({
  appliesToAll,
  setAppliesToAll,
  productOptions,
  selectedProducts,
  setSelectedProducts,
  startDate,
  setStartDate,
  expiryDate,
  setExpiryDate,
  hasExpiryDate,
  setHasExpiryDate,
  availabilityDuration,
  setAvailabilityDuration,
  isFreeShipping,
  setIsFreeShipping,
  allocationItem,
  setAllocationItem,
  isDynamic,
  isEdit = false,
}) => {
  return (
    <BodyCard
      title="Settings"
      subtitle="Manage the settings for your quotation"
      className="h-auto"
    >
      <ConnectForm>
        {({ register }) => (
          <div className="max-w-xl flex flex-col gap-y-xlarge mt-large">
            <Section
              title="Limit the number of redemptions?"
              description="Limit applies across all customers, not per customer."
              tooltip="If you wish to limit the amount of times a customer can redeem this quotation, you can set a limit here."
            >
              <InputField
                name="usage_limit"
                ref={register}
                label="Number of redemptions"
                type="number"
                placeholder="5"
              />
            </Section>
            <Section
              title="Structure"
              description="Select whether the quotation should be price quotation or a free shipping quotation."
              tooltip="If you wish to limit the amount of times a customer can redeem this quotation, you can set a limit here."
            >
              <RadioGroup.Root
                value={isFreeShipping ? "shipping" : "quotation"}
                onValueChange={(value) => {
                  setIsFreeShipping(value === "shipping")
                }}
                className="flex items-center gap-base"
              >
                <RadioGroup.SimpleItem
                  value="quotation"
                  label="Quotation"
                  disabled={isEdit}
                />
                <RadioGroup.SimpleItem
                  value="shipping"
                  label="Free Shipping"
                  disabled={isEdit}
                />
              </RadioGroup.Root>
            </Section>
            <Section
              title="Allocation"
              description="Select whether the quotation should be applied to the cart total or on a per item basis."
              tooltip="Select whether the quotation applies to the cart total or to individual items."
            >
              <RadioGroup.Root
                className="flex items-center"
                value={
                  isFreeShipping ? undefined : allocationItem ? "item" : "total"
                }
                onValueChange={(value) => {
                  setAllocationItem(value === "item")
                }}
              >
                <RadioGroup.SimpleItem
                  value="total"
                  label="Total"
                  disabled={isFreeShipping || isEdit}
                />
                <RadioGroup.SimpleItem
                  value="item"
                  label="Item"
                  disabled={isFreeShipping || isEdit}
                />
              </RadioGroup.Root>
            </Section>
            <Section
              title="Quotation applies to specific products?"
              description="Select which product(s) the Quotation applies to."
              tooltip="Select whether the quotation should apply to all products or only to specific products."
            >
              <RadioGroup.Root
                className="flex items-center"
                value={appliesToAll ? "all" : "specific"}
                onValueChange={(value) => {
                  setAppliesToAll(value === "all")
                }}
              >
                <RadioGroup.SimpleItem
                  value="all"
                  label="All products"
                  disabled={isEdit}
                />
                <RadioGroup.SimpleItem
                  value="specific"
                  label="Specific products"
                  disabled={isEdit}
                />
              </RadioGroup.Root>
              {!appliesToAll && (
                <div className="mt-large">
                  <Select
                    isMultiSelect
                    clearSelected
                    options={productOptions}
                    label="Products"
                    enableSearch
                    value={selectedProducts}
                    onChange={setSelectedProducts}
                    disabled={isEdit}
                  />
                </div>
              )}
            </Section>
            <Section
              title="Start date"
              description="Schedule the quotation to activate in the future."
              tooltip="If you want to schedule the quotation to activate in the future, you can set a start date here, otherwise the quotation will be active immediately."
            >
              <div className="flex items-center gap-xsmall">
                <DatePicker
                  date={startDate}
                  label="Start date"
                  onSubmitDate={setStartDate}
                />
                <TimePicker
                  label="Start time"
                  date={startDate}
                  onSubmitDate={setStartDate}
                />
              </div>
            </Section>
            <div>
              <div className="flex items-center mb-2xsmall">
                <Checkbox
                  label="Quotation has an expiry date?"
                  checked={hasExpiryDate}
                  onChange={() => {
                    if (expiryDate) {
                      setExpiryDate(undefined)
                    } else {
                      setExpiryDate(new Date())
                    }
                    setHasExpiryDate(!hasExpiryDate)
                  }}
                />
                <div className="flex items-center ml-1.5">
                  <InfoTooltip
                    content={
                      "If you want to schedule the Quotation to deactivate in the future, you can set an expiry date here."
                    }
                  />
                </div>
              </div>
              {expiryDate && (
                <>
                  <p className="inter-small-regular text-grey-50 mb-base">
                    Schedule the Quotation to deactivate in the future.
                  </p>
                  <div className="flex items-center gap-xsmall">
                    <DatePicker
                      label="Expiry date"
                      date={expiryDate}
                      onSubmitDate={setExpiryDate}
                    />
                    <TimePicker
                      label="Expiry time"
                      date={expiryDate}
                      onSubmitDate={setExpiryDate}
                    />
                  </div>
                </>
              )}
            </div>
            {isDynamic && (
              <AvailabilityDuration
                value={availabilityDuration}
                onChange={setAvailabilityDuration}
              />
            )}
          </div>
        )}
      </ConnectForm>
    </BodyCard>
  )
}

export default QuotationSettings
