import React, { useEffect, useState } from "react";
import { Container } from "@/components/general/containers/Container";
import { InsuranceCoverageCard } from "@/components/insurance/InsuranceCoverageCard";
import { MaxSumInsuredCard } from "@/components/insurance/MaxSumInsuredCard";
import { FetchInsuranceSummariesAPI, ListInsuranceAPI } from "@/api/insurance";
import { getUser } from "@/utils/Store";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InsuranceModelMinified, InsuranceCategory } from "@/types/insurance";
import DataTable from "react-data-table-component";
import { ButtonGhost } from "@/components/general/buttons/ButtonGhost";
import { AiOutlinePlus } from "react-icons/ai";
import { ExpandedInsuranceRow } from "@/components/insurance/ExpandedInsuranceRow";
import { FadeLoader } from "react-spinners";
import { InsuranceDialog } from "@/components/insurance/InsuranceDialog";

const insuranceTableColumns = [
    {
        name: 'Insurance Name',
        selector: row => row["policy_name"],
        sortable: true,
    },
    {
        name: 'Insurer',
        selector: row => row["policy_insurer"],
        sortable: true,
    },
    {
        name: 'Type',
        selector: row => row["policy_insurance_types"],
        sortable: true,
    },
    {
        name: 'Agent Details',
        selector: row => row["agent_name"] + "\n" + row["agent_contact_number"],
        sortable: true,
    },
    {
        name: 'Beneficiary',
        selector: row => row["beneficiary"],
        sortable: true
    },
    // {
    // name: 'Insured By',
    // selector: row => row.insuredBy,
    // sortable: true
    // }
];

export const Insurance = () => {
    const user = getUser()
    const [insuranceSummary, setInsuranceSummary] = useState(null)
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [insuranceList, setInsuranceList] = useState<InsuranceModelMinified[]>([])
    const [filteredInsuranceList, setFilteredInsuranceList] = useState<InsuranceModelMinified[]>([])
    const [insuranceCategory, setInsuranceCategory] = useState<InsuranceCategory | "">(InsuranceCategory.INSURANCE_GENERAL)

    // Loading states
    const [isLoadingSummary, setIsLoadingSummary] = useState(true)
    const [isLoadingInsurance, setIsLoadingInsurance] = useState(true)

    useEffect(() => {
        FetchInsuranceSummariesAPI(user?.uid!).then((res) => {
            setInsuranceSummary(res.data.data)
        }).finally(() => setIsLoadingSummary(false))

    }, [])

    useEffect(() => {
        ListInsuranceAPI(user?.uid!, insuranceCategory).then((res) => {
            setInsuranceList(res.data.data)
            setFilteredInsuranceList(res.data.data)
        }).finally(() => setIsLoadingInsurance(false))
    }, [insuranceCategory])

    useEffect(() => {
        if (filterText !== "") {
            const filteredItems = insuranceList.filter(
                item => item.policy_name && item.policy_name.toLowerCase().includes(filterText.toLowerCase()),
            );
            setFilteredInsuranceList(filteredItems)
        }
    }, [filterText])

    const FilterComponent = ({ filterText, onFilter: handleFilter, onClear }) => (
        <>
            <input
                id="search"
                type="text"
                placeholder="Filter By Name"
                aria-label="Search Input"
                onChange={handleFilter}
                value={filterText}
            />
            <ButtonGhost type="button" onClick={onClear}>
                X
            </ButtonGhost>
        </>
    );

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };
        return (
            <FilterComponent filterText={filterText} onFilter={(e) => {
                setFilterText(e.target.value)
            }
            } onClear={handleClear} />
        );
    }, [filterText, resetPaginationToggle]);

    return <Container className="mt-0 pb-5">
        <div className="flex flex-row gap-3 pt-3">
            {insuranceSummary &&
                <div className="flex flex-row h-[50%] w-full gap-5">
                    <InsuranceCoverageCard className="w-[50%]" {...insuranceSummary["insurance_coverage"]} />
                    <MaxSumInsuredCard className="w-[50%]" {...insuranceSummary["maximum_sum_insured"]} />
                </div>
            }
            {
                isLoadingSummary &&
                <div className="h-[40vh] w-full flex items-center justify-center">
                    <FadeLoader />
                </div>
            }
        </div>
        <div className="mt-3">
            <div className="flex flex-row justify-between w-full">
                <Tabs defaultValue={insuranceCategory} onValueChange={(value: InsuranceCategory) => {
                    setIsLoadingInsurance(true)
                    setInsuranceCategory(value)
                }}>
                    <TabsList className="col-span-1 grid grid-cols-5">
                        <TabsTrigger disabled={isLoadingInsurance} value={""}>Display All</TabsTrigger>
                        <TabsTrigger disabled={isLoadingInsurance} value={InsuranceCategory.INSURANCE_GENERAL}>General</TabsTrigger>
                        <TabsTrigger disabled={isLoadingInsurance} value={InsuranceCategory.INSURANCE_HEALTH}>Health</TabsTrigger>
                        <TabsTrigger disabled={isLoadingInsurance} value={InsuranceCategory.INSURANCE_LIFE}>Life</TabsTrigger>
                        <TabsTrigger disabled={isLoadingInsurance} value={InsuranceCategory.INSURANCE_INVESTMENTS}>Investments</TabsTrigger>
                    </TabsList>
                </Tabs>

                <InsuranceDialog buttonIcon={AiOutlinePlus} buttonLabel="Add Insurance" currentAction="CREATE_INSURANCE" />

            </div>
            {isLoadingInsurance
                ? <div className="h-[40vh] w-full flex items-center justify-center"><FadeLoader /></div>
                : <DataTable title="Insurance Table" subHeader subHeaderComponent={subHeaderComponentMemo} columns={insuranceTableColumns} data={filteredInsuranceList} pagination paginationResetDefaultPage={resetPaginationToggle} expandableRows expandableRowsComponent={ExpandedInsuranceRow} />
            }
        </div>
    </Container >
};
