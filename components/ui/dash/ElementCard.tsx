import { ElelementConfigType } from "@/config/elements"
import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Stat,
    StatArrow,
    StatHelpText,
    StatLabel,
    StatNumber,
    Text,
} from "@chakra-ui/react"
import { useMemo, useRef } from "react"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { parseColor } from "@/utils/parseColor"

/**
 * Chart JS
 */
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
)
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Statistiques",
        },
    },
}
/**
 * Chart JS
 */

export type ElementCardProps = {
    data: ElelementConfigType
    value: Array<number>
}
export const ElementCard = (props: ElementCardProps) => {
    const { name, id, unit, color } = props.data
    const { value } = props

    const accordion = useRef<HTMLButtonElement>(null)

    const dataElement: Array<number> = [...value]

    const dataChart = useMemo(() => {
        return {
            data: {
                labels: dataElement.map((el: number, k: number) => {
                    return k + 1
                }),
                datasets: [
                    {
                        fill: true,
                        label: "Dataset 2",
                        data: dataElement,
                        borderColor: color !== "#" && color !== "" ? color : "rgb(53, 162, 235)",
                        backgroundColor: parseColor(color),
                    },
                ],
            },
        }
    }, [value])
    const diff = (value.at(-1) || 0) - (value.at(-2) || 0)

    return (
        <Box pt="4" pb="0" borderBottom={"1px solid #efefef"}>
            <Flex justifyContent="space-between" alignItems="center">
                <Box>
                    <Stat>
                        <StatLabel>{unit}</StatLabel>
                        <StatNumber color="black.100">{value.at(-1) || "0"}</StatNumber>
                        <StatHelpText>
                            {diff >= 0 ? (
                                <StatArrow type="increase" />
                            ) : (
                                <StatArrow type="decrease" />
                            )}
                            {diff}
                        </StatHelpText>
                    </Stat>
                </Box>
                <Flex direction={"column"} alignItems={"flex-end"} gap={"2"}>
                    <Text fontSize="xl" textTransform={"capitalize"}>
                        {name}
                    </Text>
                    <Text
                        _hover={{ color: "primary", cursor: "pointer" }}
                        onClick={() => accordion.current?.click()}
                    >
                        Details
                    </Text>
                </Flex>
            </Flex>
            <Accordion allowMultiple>
                <AccordionItem border={"none"}>
                    <AccordionButton ref={accordion} opacity={0}></AccordionButton>
                    <AccordionPanel pb={4}>
                        <Line options={options} data={dataChart.data} />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    )
}
