import { Box, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { HookFormTextField } from "Components/Reusable";
import { useDispatch } from "react-redux";
import { buyOrSellAsset } from "redux/actions";
import { useSelector } from "react-redux";
import { useEffect } from "react";

/**
 *@function SellForm.jsx
 *@author Azim
 *
 **/

const SellForm = () => {
  const { currentStock } = useSelector((state) => state.margin);
  const getPrice = (price) => {
    const finalPrice = (price * 0.1) / 100;
    const update = price + finalPrice;
    return update;
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      price: getPrice(Number(currentStock?.last_price)),
    },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentStock) {
      setValue("price", getPrice(Number(currentStock?.last_price)));
    }
  }, [currentStock, setValue]);

  const onSubmit = (data) => {
    const newFinalData = { ...data };
    newFinalData.stock_pair_id = currentStock?.id;
    newFinalData.user_id = "1";
    newFinalData.margin = "0.10%";
    newFinalData.fee = "0.05%";
    newFinalData.type = 2;
    dispatch(buyOrSellAsset(newFinalData));
    reset({ price: data.price });
  };

  return (
    <Box>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Box display={"flex"} mt="16px" justifyContent={"space-between"}>
          <HookFormTextField
            name="price"
            control={control}
            label="Price"
            InputProps={{
              disabled: true,
            }}
            // errors={createError}
            size="small"
            type="number"
            style={{ width: "100%" }}
          />
        </Box>
        <Box display={"flex"} mt="16px" justifyContent={"space-between"}>
          <HookFormTextField
            name="amount"
            control={control}
            label="Amount"
            // errors={createError}
            type="number"
            size="small"
            style={{ width: "100%" }}
          />
        </Box>

        <Box>
          <Box
            display={`flex`}
            alignItems="center"
            justifyContent="space-between"
          >
            <p>Available</p>
            <p>{0} USD</p>
          </Box>
          <Box
            display={`flex`}
            alignItems="center"
            justifyContent="space-between"
          >
            <p>Margin</p>
            <p>{0} USD</p>
          </Box>
          <Box
            display={`flex`}
            alignItems="center"
            justifyContent="space-between"
          >
            <p>Fee</p>
            <p>{0} USD</p>
          </Box>
        </Box>
        <Box display={"flex"} mt="16px" justifyContent={"space-between"}>
          <Button
            style={{ background: "#fa4961" }}
            fullWidth
            type="submit"
            color="primary"
            variant="contained"
          >
            {"Sell"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SellForm;
