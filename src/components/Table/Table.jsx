import { Button, Container, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from "@mui/material"
import UseColors from "../../assets/Colors";


function TableComponent({ loading, data, handleApprove, handleReject }) {
    const { fontColor, bgColor, cardBg } = UseColors()
    const StyledTableCell = styled(TableCell)(() => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: bgColor,
            color: fontColor,
        },
        [`&.${tableCellClasses.body}`]: {
            backgroundColor: bgColor,
            color: fontColor,

        },
    }));
    const StyledTableRow = styled(TableRow)(() => ({
        '&:nth-of-type(odd)': {
            backgroundColor: bgColor,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    return (

        <TableContainer sx={{
            border: 1,
            borderColor: "white"
        }} component={Paper}  >
            {
                loading ?
                    <Table aria-label="simple table" >
                        <TableHead>
                            <StyledTableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                {
                                    Array(4).fill('').map((_, index) => (
                                        <StyledTableCell key={index + 123} sx={{ width: '100VW' }} align="center">
                                            <Skeleton sx={{ bgcolor: cardBg, color: "white", minWidth: "100%", minHeight: '100%' }} variant="rectangular" animation="wave" />
                                        </StyledTableCell>
                                    ))
                                }

                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {
                                Array(5).fill('').map((_, index) => (

                                    <StyledTableRow key={index + 234}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        {
                                            Array(4).fill('').map((_, index) => (
                                                <StyledTableCell key={index + 143} sx={{ width: '100VW' }} align="center">
                                                    <Skeleton sx={{ bgcolor: cardBg, color: bgColor, minWidth: "100%", minHeight: '100%' }} variant="rectangular" animation="wave" />
                                                </StyledTableCell>

                                            ))
                                        }
                                    </StyledTableRow>

                                ))
                            }
                        </TableBody>
                    </Table>
                    :
                    <Table aria-label="simple table" >
                        <TableHead>
                            {
                                <TableRow>
                                    {!data?.length ?
                                        <StyledTableCell sx={{ width: '100VW' }} align="center">No data available</StyledTableCell>
                                        :
                                        Object?.keys(data[0])?.map((data, index) => (
                                            <StyledTableCell key={index + "awdds"} align="center">{data}</StyledTableCell>
                                        ))
                                    }
                                </TableRow>
                            }
                        </TableHead>
                        <TableBody>
                            {data?.length !== 0 ?
                                // eslint-disable-next-line react/prop-types
                                data?.map((object, index) => {
                                    const tableTitles = <StyledTableRow key={index + 676}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        {
                                            Object?.keys(object).map((key) => {
                                                if (key === 'Handle') {
                                                    return <StyledTableCell key={key + "sjfdnj"} component="th" align="center" scope="row"><Button variant="contained" sx={{ position: "static" }} color={object?.[key].color} onClick={object?.[key].action} disableRipple disableFocusRipple>{object?.[key].name}</Button></StyledTableCell>
                                                }
                                                return <StyledTableCell key={key + "dsfdsf"} component="th" align="center" scope="row">{object?.[key]}</StyledTableCell>
                                            })
                                        }
                                    </StyledTableRow>
                                    return tableTitles
                                }) :
                                <StyledTableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell sx={{ width: '100VW' }} component="th" align="center" scope="row">No data available</StyledTableCell>
                                </StyledTableRow>
                            }
                        </TableBody>
                    </Table>
            }
        </TableContainer>

    )
}

export default TableComponent