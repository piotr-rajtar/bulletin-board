import React from 'react';
import PropTypes from 'prop-types';

import styles from './Form.module.scss';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import ImageUploader from 'react-images-upload';

class Component extends React.Component {

  static propTypes = {
    postData: PropTypes.object,
    setPhoto: PropTypes.func,
    setUpdateDate: PropTypes.func,
    handleChange: PropTypes.func,
    handleSelectChange: PropTypes.func,
    submitForm: PropTypes.func,
    fillNoVisibleParameters: PropTypes.func,
  }

  render() {
    const {postData, submitForm, handleSelectChange, handleChange, setUpdateDate, setPhoto, fillNoVisibleParameters} = this.props;
    return(
      <form
        className={styles.form}
        onSubmit={submitForm}>
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          InputProps={{
            minLength: 10,
          }}
          required
          fullWidth
          className={styles.formFieldFullWidth}
          onChange={handleChange}
          value={postData? postData.title : undefined}
        />
        <TextField
          id="content"
          label="Content"
          multiline
          variant="outlined"
          InputProps={{
            minLength: 20,
          }}
          required
          fullWidth
          className={styles.formFieldFullWidth}
          onChange={handleChange}
          value={postData? postData.content : undefined}
        />
        <TextField
          id="price"
          label="Price"
          variant="outlined"
          type="number"
          inputProps={{
            min: 0,
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          className={styles.formFieldPartialWidth}
          onChange={handleChange}
          value={postData? postData.price : undefined}
        />
        <TextField
          id="phone"
          label="Phone number"
          variant="outlined"
          type="tel"
          className={styles.formFieldPartialWidth}
          onChange={handleChange}
          value={postData? postData.phone : undefined}
        />
        <TextField
          id="location"
          label="Location"
          variant="outlined"
          className={styles.formFieldPartialWidth}
          onChange={handleChange}
          value={postData? postData.location : undefined}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          required
          fullWidth
          className={styles.formFieldFullWidth}
          onChange={handleChange}
          value={postData? postData.email : undefined}
        />
        {postData
          ?
          <TextField
            id='status'
            select
            label='Status'
            value={postData.status}
            onChange={handleSelectChange}
            variant='outlined'
            className={styles.formFieldPartialWidth}
          >
            <MenuItem value='active'>Active</MenuItem>
            <MenuItem value='closed'>Closed</MenuItem>
          </TextField>
          : ''
        }
        <ImageUploader
          withIcon={true}
          buttonText='Choose image'
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={5242880}
          withPreview={true}
          onChange={setPhoto}
          singleImage={true}
        />
        <Button
          variant="outlined"
          color="primary"
          size="large"
          className={styles.button}
          type="submit"
          onClick={postData? setUpdateDate :fillNoVisibleParameters}
        >
          {postData? 'Edit' : 'Submit'}
        </Button>
      </form>
    );
  }
}

export {
  Component as Form,
  //Container as Form,
  Component as FormComponent,
};
