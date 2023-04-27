import classNames from "classnames";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { Formik } from "formik";
import { useSongStore } from "~/store";

type Props = {
  className?: string;
};

const AddSong = (props: Props) => {
  const addSong = useSongStore((state) => state.addSong);

  return (
    <Formik
      initialValues={{ title: "", artist: "", lyrics: "" }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        addSong(values);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form
          onSubmit={handleSubmit}
          className={classNames("flex w-full flex-col gap-4", props.className)}
        >
          <h2 className="text-2xl font-bold">Add a new song</h2>
          <div className="flex w-full gap-2">
            <div className="w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="title" value="Title" />
              </div>
              <TextInput
                id="title"
                type="text"
                required={true}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
            </div>
            <div className="w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="artist" value="Artist" />
              </div>
              <TextInput
                id="artist"
                type="text"
                required={true}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.artist}
              />
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="lyrics" value="Lyrics" />
            </div>
            <Textarea
              id="lyrics"
              placeholder="Paste the lyrics here :)"
              required={true}
              rows={4}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lyrics}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            Add
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default AddSong;
