import { Box, Button, Grid, IconButton } from "@mui/material";
import { Image } from "antd";
import Card from "components/container/Card";
import { PageContainer } from "components/index";
import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "react-componentry";
import {Icon} from '@iconify/react';

export default function TeacherRegistration() {
  const { control } = useForm({
    defaultValues: {
      name: "",
      email: "",
      location: "",
      specialization: "",
      experience: "",
      extra: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "extra",
  });

  return (
    <PageContainer title="Teacher registration" sx={{ pb: 2 }}>
      <Card sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} md={2} lg={2}>
            <Image
              fallback={
                "https://cdn4.iconfinder.com/data/icons/ui-beast-4/32/Ui-12-1024.png"
              }
              alt="img"
              style={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid item xs={12} sm={9} md={10} lg={10}>
            <Input
              control={control}
              size="small"
              fullWidth
              name="name"
              label="Name"
            />
            <Input
              control={control}
              size="small"
              fullWidth
              name="email"
              label="Email"
            />
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ mb: 2 }}>
        <Input
          control={control}
          size="small"
          fullWidth
          name="location"
          label="Location"
        />
        <Input
          control={control}
          size="small"
          fullWidth
          name="specialization"
          label="Specialization"
        />
        <Input
          control={control}
          size="small"
          fullWidth
          name="experience"
          label="Experience"
        />
      </Card>
      <Card>
        <Grid container spacing={2}>
          {fields.map((field, index) => (
            <Grid item xs={12} key={field.id} sx={{display: 'flex'}}>
              <Box border={1} borderColor="divider" p={2} flexGrow={1} borderRadius={2}>
                <Input
                  control={control}
                  size="small"
                  fullWidth
                  name={`extra.${index}.label`}
                  label="Label"
                />
                <Input
                  control={control}
                  size="small"
                  fullWidth
                  name={`extra.${index}.value`}
                  label="Value"
                />
              </Box>
              <Box>
              <IconButton onClick={() => remove(index)}><Icon icon="fluent:delete-28-regular" /></IconButton>
              </Box>
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Button
            startIcon={<Icon icon="fluent:add-48-regular" />}
              variant="outlined"
              onClick={() =>
                append({
                  label: "",
                  value: "",
                })
              }
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Button variant="contained" sx={{ mt: 2 }}>
        Register
        </Button>
    </PageContainer>
  );
}
