import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Avatar, Box, IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SVGRender, UserAvatar } from "Components/Reusable";
import { globalStyle } from "assets/Styles/GlobalStyle";
import { images } from "assets";
import Avatars from "assets/Avatars";


const ReleaseCandidate = ({ cardId, classes }) => {
    const { kanbanData } = useSelector(state => state.kanban)
    const { organizationProfile } = useSelector((state) => state.orgprofile);
    const [toDoLane, setToDoLane] = useState()

    useEffect(() => {
        if (kanbanData) {
            // get first index
            // splice items from first to given index
            // find previous index
            const { cards } = kanbanData.find(value => value.label === "To Do")
            console.log({cards})
            const mainCard = cards.findIndex(value => value.id === cardId)
            const newcards = cards.slice(0, mainCard)
            const releasecard = []
            for (const card of newcards.reverse()) {
                if (card?.type === "release") {
                    break
                } else {
                    releasecard.push(card)
                }
            }
            const newrows = releasecard?.reverse()?.map((item) => {
                return {
                    id: item?.id,
                    ticketname: item?.choresLabel !== "" ? item?.choresLabel : item?.bugsLabel !== "" ? item?.bugsLabel : item?.description,
                    workstarted: item?.createDate,
                    size: item?.size,
                    owner: item?.userId,
                    estimate: item?.dueDate
                }
            })
            setToDoLane(newrows)
        }
    }, [kanbanData])

    const getAvatar = (value) => {
        const newAvatar = organizationProfile.find(
            (item) => item.id === value && item
        );
        let newData;
        Object.keys(Avatars).find((key, index) => {
            if (key === newAvatar?.avatar) {
                newData = `${Avatars[newAvatar?.avatar]}`;
                return newData;
            }
            return newData;
        });
        return newData;
    };

    const getName = (value) => {
        const showingName = organizationProfile.find(
            (item) => item.id === value && item
        );
        return showingName?.name;
    };

    const columns: GridColDef[] = [
        { field: 'id', hide: true },
        {
            field: 'ticketname',
            headerName: 'Ticket Name',
            width: 150,
            editable: false,
        },
        {
            field: 'workstarted',
            headerName: 'Work Started',
            width: 150,
            editable: false,
            renderCell:(params) => {
                const date = new Date(params.value)
                return <span>{date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear()}</span>
            }
        },
        {
            field: 'size',
            headerName: 'Size',
            width: 110,
            editable: false,
            renderCell: (params) => {
                return <IconButton>
                    {params && params.value ?
                        <SVGRender
                            style={globalStyle.renderStyle}
                            img={params?.value === "0" ? images.tShirt : params?.value === "1" ? images.smallIconForSize : params.value === "2" ? images.mediumIconForSize : images.largeIconForSize}
                            alt={"small Icon"}
                        /> : <SVGRender
                            style={globalStyle.renderStyle}
                            img={images.tshirt}
                            alt={"small Icon"}
                        />}
                </IconButton>
            }
        },
        {
            field: 'owner',
            headerName: 'Owner',
            width: 110,
            editable: false,
            renderCell: (params) => {
                // console.log(params)
                return <IconButton
                >
                    {params.value ? (
                        <UserAvatar
                            className={classes.updateCardAvatar}
                            getAvatar={getAvatar}
                            getName={getName ?? "no"}
                            userId={params?.value}
                        />
                    ) : (
                        <Avatar className={classes.updateCardAvatar} />
                    )}
                </IconButton>
            }
        },
        {
            field: 'estimate',
            headerName: 'Estimate',
            width: 110,
            editable: false,
            renderCell: (params) => {
                const date = new Date(params.value)
                return <span>{params.value !== "" ? date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear() : null}</span>
            }
        },
    ];



    return (
        <div>
            <Box sx={{ width: '100%' }}>
                {toDoLane && toDoLane ? (
                    <DataGrid
                        rows={toDoLane}
                        columns={columns}
                        pageSize={5}
                        autoHeight={true}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                    />) : null}
            </Box>
        </div>
    );
};

export default ReleaseCandidate;