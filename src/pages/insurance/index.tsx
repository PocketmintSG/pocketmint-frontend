import React, { useEffect, useState } from "react";
import { Container } from "@/components/general/containers/Container";
import { InsuranceCoverageCard } from "@/components/insurance/InsuranceCoverageCard";
import { MaxSumInsuredCard } from "@/components/insurance/MaxSumInsuredCard";
import { FetchInsuranceSummariesAPI, ListInsuranceAPI } from "@/api/insurance";
import { getUser } from "@/utils/Store";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoverageType, InsuranceModelMinified, InsuranceTypes } from "@/types/insurance";
import DataTable from "react-data-table-component";
import { FormInput } from "@/components/general/form/FormInput";
import { ButtonGhost } from "@/components/general/buttons/ButtonGhost";
import { ButtonFilled } from "@/components/general/buttons/ButtonFilled";
import { AiOutlinePlus } from "react-icons/ai";

const insuranceData = {
    "status": "success",
    "message": "Insurance listed!",
    "data": [
        {
            "_id": "64e8b94e60b78fc8fd967ac7",
            "policy_name": "Life Insurance",
            "policy_insurer": "XYZ Insurance",
            "policy_insurance_types": [
                "Term Life"
            ],
            "agent_name": "Agent Smith",
            "agent_contact_number": "123-456-7890",
            "beneficiary": "Jane Doe"
        },
        {
            "_id": "64e8b95160b78fc8fd967ac8",
            "policy_name": "Health Insurance",
            "policy_insurer": "ABC Health",
            "policy_insurance_types": [
                "Retirement"
            ],
            "agent_name": "Agent Johnson",
            "agent_contact_number": "987-654-3210",
            "beneficiary": "John Smith"
        },
        {
            "_id": "64e8b95160b78fc8fd967ac9",
            "policy_name": "Auto Insurance",
            "policy_insurer": "123 Auto",
            "policy_insurance_types": [
                "Critical Illnes"
            ],
            "agent_name": "Agent Brown",
            "agent_contact_number": "555-123-4567",
            "beneficiary": "Bob Johnson"
        },
        {
            "_id": "64e8b95160b78fc8fd967aca",
            "policy_name": "Home Insurance",
            "policy_insurer": "Secure Homes",
            "policy_insurance_types": [
                "Travel"
            ],
            "agent_name": "Agent Miller",
            "agent_contact_number": "999-888-7777",
            "beneficiary": "Emily Williams"
        },
        {
            "_id": "64e8b95260b78fc8fd967acb",
            "policy_name": "Travel Insurance",
            "policy_insurer": "Wanderlust Insurers",
            "policy_insurance_types": [
                "Critical Illness",
                "Helper"
            ],
            "agent_name": "Agent Anderson",
            "agent_contact_number": "111-222-3333",
            "beneficiary": "Michael Lee"
        }
    ]
}

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
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const [filterText, setFilterText] = React.useState('');
    const [insuranceList, setInsuranceList] = useState<InsuranceModelMinified[]>([])
    const [filteredInsuranceList, setFilteredInsuranceList] = useState<InsuranceModelMinified[]>([])
    const [insuranceType, setInsuranceType] = useState<InsuranceTypes>(InsuranceTypes.INSURANCE_GENERAL)


    useEffect(() => {
        FetchInsuranceSummariesAPI(user?.uid!).then((res) => {
            setInsuranceSummary(res.data.data)
        })
        // ListInsuranceAPI(user?.uid!).then((res) => {
        // setInsuranceList(res.data.data)
        // setFilteredInsuranceList(res.data.data)
        // })
        setInsuranceList(insuranceData.data)
        setFilteredInsuranceList(insuranceData.data)
    }, [])

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

    return <Container className="mt-0">
        <div className="flex flex-row gap-3 pt-3">
            {insuranceSummary &&
                <>
                    <InsuranceCoverageCard className="w-[50%]" {...insuranceSummary["insurance_coverage"]} />
                    <MaxSumInsuredCard className="w-[50%]" {...insuranceSummary["maximum_sum_insured"]} />
                </>
            }
        </div>
        <div className="mt-3">
            <div className="flex flex-row justify-between w-full">
                <Tabs defaultValue={insuranceType} onValueChange={(value: InsuranceTypes) => setInsuranceType(value)}>
                    <TabsList className="col-span-1 grid grid-cols-4">
                        <TabsTrigger value={InsuranceTypes.INSURANCE_GENERAL}>General</TabsTrigger>
                        <TabsTrigger value={InsuranceTypes.INSURANCE_HEALTH}>Health</TabsTrigger>
                        <TabsTrigger value={InsuranceTypes.INSURANCE_LIFE}>Life</TabsTrigger>
                        <TabsTrigger value={InsuranceTypes.INSURANCE_INVESTMENTS}>Investments</TabsTrigger>
                    </TabsList>
                </Tabs>

                <ButtonFilled className="flex flex-row justify-center items-center w-[20%]">
                    <AiOutlinePlus />
                    Add Insurance
                </ButtonFilled>
            </div>
            <div>
                <DataTable title="Insurance Table" subHeader subHeaderComponent={subHeaderComponentMemo} columns={insuranceTableColumns} data={filteredInsuranceList} pagination paginationResetDefaultPage={resetPaginationToggle} />
            </div>
        </div>
    </Container >
};
