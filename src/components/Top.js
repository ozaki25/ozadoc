import React, { useState, useEffect } from "react";
import {
  Pane,
  Heading,
  Table,
  TextInputField,
  Button,
  Spinner,
  Link,
  Icon,
  Dialog
} from "evergreen-ui";
import { API, graphqlOperation } from "aws-amplify";
import { listPostss } from "../graphql/queries";
import { createPosts } from "../graphql/mutations";
import { deletePosts } from "../graphql/mutations";

function Top() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState("");
  const [isDialogShown, setIsDialogShown] = useState(false);

  const regPosts = async () => {
    const CreatePostsInput = {
      name: name,
      url: url,
      description: description
    };

    try {
      await API.graphql(
        graphqlOperation(createPosts, { input: CreatePostsInput })
      );
      console.log("ok");
      setIsDialogShown(true);
    } catch (e) {
      console.log(e);
    }
  };
  const getPosts = async () => {
    try {
      const posts = await API.graphql(graphqlOperation(listPostss));
      setData(posts);
    } catch (e) {
      console.log(e);
    }
  };

  const delPosts = async d => {
    const DeletePostsInput = {
      id: d.id
    };
    try {
      await API.graphql(
        graphqlOperation(deletePosts, { input: DeletePostsInput })
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      <Pane padding={10} margin={10}>
        <Dialog
          isShown={isDialogShown}
          hasCancel={false}
          title="Complete!"
          confirmLabel="OK!"
          onConfirm={() => {
            setIsDialogShown(false);
            getPosts();
          }}
          onCloseComplete={() => setIsDialogShown(false)}
        >
          Hooray!Thankyou!!
        </Dialog>
        <Heading size={800} marginTop="default">
          TOP
        </Heading>
        <Pane width={300} margin={10}>
          <TextInputField
            label="Title"
            name="input-name"
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
          ></TextInputField>
          <TextInputField
            label="URL"
            name="input-url"
            value={url}
            onChange={e => {
              setUrl(e.target.value);
            }}
          ></TextInputField>
          <TextInputField
            label="Description"
            name="input-description"
            value={description}
            onChange={e => {
              setDescription(e.target.value);
            }}
          ></TextInputField>
          <Button onClick={regPosts}>Registry!</Button>
        </Pane>
        {data ? (
          <Table>
            <Table.Head>
              <Table.TextHeaderCell>name</Table.TextHeaderCell>
              <Table.TextHeaderCell>URL</Table.TextHeaderCell>
              <Table.TextHeaderCell>Description</Table.TextHeaderCell>
              <Table.TextHeaderCell>Other</Table.TextHeaderCell>
            </Table.Head>
            <Table.Body>
              {data.data.listPostss.items.map(d => {
                return (
                  <Table.Row key={d.id}>
                    <Table.TextCell>{d.name}</Table.TextCell>
                    <Table.TextCell>
                      <Link href={d.url} target="_blank">
                        {d.url}
                      </Link>
                    </Table.TextCell>
                    <Table.TextCell>{d.description}</Table.TextCell>
                    <Table.TextCell>
                      <Icon
                        icon="trash"
                        onClick={() => {
                          delPosts(d);
                          getPosts();
                        }}
                      />
                      <Icon icon="edit" />
                    </Table.TextCell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        ) : (
          <Spinner />
        )}
      </Pane>
    </div>
  );
}

export default Top;
