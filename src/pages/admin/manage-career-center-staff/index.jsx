import Layout from "@/components/layout";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Group,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { Check } from "tabler-icons-react";

function TableHeader(props) {
  return <Text ta={"center"} {...props} />;
}

function TableText(props) {
  return <Text fw={700} ta={"center"} {...props} />;
}

export default function Index({ data }) {
  const [values, setValues] = useState(data);
  const selectData = [
    { value: 4, label: "Career Center" },
    { value: 5, label: "Employee" },
  ];
  const [updateds, setUpdates] = useState({});
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationData, setNotificationData] = useState({
    title: "",
    description: "",
    icon: <Check />,
  });
  const [saveLoader, setSaveLoader] = useState(false);

  function selectHandler(event, uuid) {
    let temp = updateds;
    let tempValues = values;
    let response = [];
    tempValues = values.map((element) => {
      if (element.UUID === uuid) {
        if (element.roleID === event) {
          delete temp[uuid];
          response.push(element);
        }
        return { ...element, roleID: event };
      } else {
        return element;
      }
    });
    if (response.length === 0) {
      temp[uuid] = event;
    }
    setUpdates(temp);
    setValues(tempValues);
  }
  async function saveHandler() {
    const body = Object.entries(updateds).map(([key, value]) => {
      return {
        UUID: key,
        roleID: value,
      };
    });
    console.log(body                                     )
  }
  function cancelHandler() {
    setValues(data);
    setUpdates({});
  }


  return (
    <Layout role={"admin"}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          paddingLeft: "5vw",
          paddingRight: "5vw",
        }}
      >
        <Title pb={5} ta={"left"} color="text">
          MANAGE CAREER CENTER STAFF
        </Title>

        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 50,
            marginBottom: "50px",
            minHeight: "50vh",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack pb={20} sx={{ minHeight: "45vh", width: "100%" }}>
            <Grid pl={"1rem"} pr={"1rem"} pt={15}>
              <Grid.Col span={1}></Grid.Col>
              <Grid.Col xs={12} md={4} lg={3}>
                <TableHeader>Instructor</TableHeader>
              </Grid.Col>
              <Grid.Col xs={12} md={4} lg={4}>
                <TableHeader>Role</TableHeader>
              </Grid.Col>
              <Grid.Col xs={12} md={3} lg={4}>
                <TableHeader>Created at</TableHeader>
              </Grid.Col>
            </Grid>
            {values.map((element) => (
              <Grid
                justify="center"
                align="center"
                pl={"1rem"}
                pr={"1rem"}
                key={"user_admin" + element.UUID}
              >
                <Grid.Col span={1}>
                  <Center>
                    <Avatar></Avatar>
                  </Center>
                </Grid.Col>
                <Grid.Col xs={12} md={4} lg={3}>
                  <TableText>{element.label}</TableText>
                </Grid.Col>
                <Grid.Col xs={12} md={4} lg={4}>
                  <Select
                  onChange={(event)=>selectHandler(event, element.UUID)}
                    placeholder="Role"
                    data={selectData}
                    value={element.roleID}
                  />
                </Grid.Col>
                <Grid.Col xs={12} md={3} lg={4}>
                  <TableText>{new Date(element.createdAt).toLocaleString()}</TableText>
                </Grid.Col>
              </Grid>
            ))}
          </Stack>
          <Center>
            <Group>
              <Button
                onClick={saveHandler}
                disabled={Object.keys(updateds).length === 0}
                radius={"xl"}
                sx={{ width: "fit-content" }}
                loading={saveLoader}
              >
                Save the Changes
              </Button>
              {Object.keys(updateds).length !== 0 ? (
                <Button
                  color="gray"
                  radius={"xl"}
                  sx={{ width: "fit-content" }}
                  onClick={cancelHandler}
                >
                  Cancel
                </Button>
              ) : (
                <></>
              )}
            </Group>
          </Center>
        </Box>
      </Box>
    </Layout>
  );
}

export async function getServerSideProps() {
  const data = await fetch("http://localhost:3000/api/admin/get-career-center-staff")
    .then((res) => res.json())
    .then((res) => res.data);

  return { props: { data } };
}

