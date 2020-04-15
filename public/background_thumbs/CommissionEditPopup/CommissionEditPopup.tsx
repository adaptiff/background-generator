// DS: PO09
/** A popup for adding new or editing existing commissions */
import React from 'react';
import numeral from 'numeral';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { convertFromRaw } from '@wix/draft-js';

import { PapiDeviation, PapiEditorText } from '@wix/da-types-papi';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Formik, Form, Field, FormikProps } from 'formik';
import { EditorFlavourConfigs } from '../DaEditorWrapper/config';
import {
  CreateCommissionPayload,
  UpdateCommissionPayload,
} from '../redux/commissions/actionCreators';
import {
  default as CommissionConfirmation,
  Props as CommissionConfirmationProps,
} from './CommissionConfirmation';
import get from 'lodash/get';
import FormPopup from '../Popup/Form';
import Points from '../Icons/Points';
import Input from '../Input';
import DaEditorWrapper from '../DaEditorWrapper/LoadableDaEditorWrapper';
import DaEditorMobileFullscreenPopup from '../DaEditorWrapper/MobileFullscreenPopup';
import { convertToClientStorageState } from '../DaEditorWrapper/utils';
import TextRenderer from '../TextRenderer';
import CommissionViewer from '../DaEditorWrapper/Viewer/Commission';
import { withMobileContext } from '../Context';
import LoadingIndicator from '../LoadingIndicator';

import mergeTheme from '../DaEditorWrapper/Themes/mergeTheme';
// Merge the text theme with the editor theme (content vs editor toolbars etc)
import textTheme from '../DaEditorWrapper/Themes/Viewer/commission.scss';
import editorTheme from '../DaEditorWrapper/Themes/Editor/commission.scss';
const commissionTheme = mergeTheme(textTheme, editorTheme);

import s from './CommissionEditPopup.scss';

export enum InputNames {
  Title = 'title',
  PointsCost = 'pointsCost',
}

const DA_PROFIT_MARGIN = 0.2;
const POINTS_IN_ONE_DOLLAR = 80;
const TITLE_MIN_LENGTH = 4;
const TITLE_MAX_LENGTH = 70;
const POINTS_VALUE_STEP = 10;
const POINTS_MIN_VALUE = 10;
const POINTS_MAX_VALUE = 8000;
const SCROLL_TO_INPUTS = [InputNames.Title, InputNames.PointsCost];

export interface Props {
  deviation?: PapiDeviation;
  className?: string;
  isMobile?: boolean;
  redirectOnSubmit?: boolean;
  onClose: () => void;
  updateCommission: (deviation: UpdateCommissionPayload) => void;
  createCommission: (commissionFields: CreateCommissionPayload) => void;
}

export interface State {
  footerToolbar?: any;
  confirmationPopupType?:
    | CommissionConfirmationProps['confirmationType']
    | null;
  openMobileDescriptionEditor: boolean;
  mobileEditorDone: boolean;
  mobileEditorVersion: number;
  editorDirty?: boolean;
}

export interface FormValues {
  title: string;
  pointsCost: string;
  description: string;
}

export class CommissionEdit extends React.Component<
  Props & WithTranslation,
  State
> {
  state: State = {
    footerToolbar: undefined,
    confirmationPopupType: null,
    openMobileDescriptionEditor: false,
    mobileEditorDone: false,
    mobileEditorVersion: 0,
  };

  editorContent: any;
  editorRawState: any;
  editorFeatures: any[];
  inputRefs: { [key: string]: HTMLInputElement } | {} = {};

  constructor(props: Props & WithTranslation) {
    super(props);

    const { deviation, isMobile } = props;

    // On mobile, the editor is not rendered until you actually tap on the viewer.
    // This can create an issue if you edit another field and save, without touching the editor.
    // In order to avoid data being lost in this case, we prefill the editor state with the initial data.
    if (isMobile && deviation?.textContent) {
      const { markup = '{}', features = '[]' } = deviation?.textContent.html;
      const rawDraftContentState = JSON.parse(markup);
      this.editorContent = convertFromRaw(rawDraftContentState);
      this.editorFeatures = JSON.parse(features);
      this.editorRawState = rawDraftContentState;
    }
  }

  getInputRefHandler = fieldName => ref => {
    this.inputRefs[fieldName] = ref;
  };

  handleSubmit = form => {
    const {
      deviation,
      updateCommission,
      createCommission,
      redirectOnSubmit,
      onClose,
    } = this.props;
    if (deviation) {
      updateCommission({
        commissionid: deviation.deviationId,
        title: form.title,
        pointsCost: form.pointsCost,
        editorRawState: this.editorRawState,
        editorContent: this.editorContent,
        features: this.editorFeatures,
      });
      onClose();
    } else {
      createCommission({
        title: form.title,
        pointsCost: Number.parseInt(form.pointsCost),
        editorRawState: this.editorRawState,
        editorContent: this.editorContent,
        features: this.editorFeatures,
        redirectOnSubmit,
      });
      if (!redirectOnSubmit) {
        onClose();
      }
    }
  };

  scrollInvalidIntoView = errors => {
    const invalidInputNames = Object.keys(errors);

    for (let i = 0; i < SCROLL_TO_INPUTS.length; i++) {
      const inputName = SCROLL_TO_INPUTS[i];
      if (invalidInputNames.includes(inputName)) {
        this.inputRefs[inputName].focus();
        break;
      }
    }
  };

  validateTitle = value => {
    if (!value) {
      return this.props.t('commission.validation.title.required');
    } else if (
      value.trim().length < TITLE_MIN_LENGTH ||
      value.trim().length > TITLE_MAX_LENGTH
    ) {
      return this.props.t('commission.validation.title.lengthExceeded', {
        min: TITLE_MIN_LENGTH,
        max: TITLE_MAX_LENGTH,
      });
    }
    return undefined;
  };

  validatePrice = value => {
    if (!value) {
      return this.props.t('commission.validation.pointsCost.required');
    } else if (value < POINTS_MIN_VALUE) {
      return this.props.t('commission.validation.pointsCost.min', {
        min: POINTS_MIN_VALUE,
      });
    } else if (value > POINTS_MAX_VALUE) {
      return this.props.t('commission.validation.pointsCost.max', {
        max: POINTS_MAX_VALUE,
      });
    } else if (value % POINTS_VALUE_STEP !== 0) {
      return this.props.t('commission.validation.pointsCost.isDivisibleBy', {
        step: POINTS_VALUE_STEP,
      });
    }
    return undefined;
  };

  validateForm = values => {
    const errors = {
      pointsCost: this.validatePrice(values.pointsCost),
      title: this.validateTitle(values.title),
    };

    Object.keys(errors).forEach(
      key => errors[key] === undefined && delete errors[key]
    );

    return errors;
  };

  renderForm() {
    const commission = this.props.deviation && this.props.deviation.commission;

    const initialValues = {
      title: (commission && commission.title) || '',
      description: get(commission, 'textContent.html.markup', ''),
      pointsCost: (commission && commission.pointsCost) || '',
    };

    const { deviation, onClose, t, isMobile } = this.props;

    let artistPointsProfit;

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        validate={this.validateForm}
        render={({
          submitForm,
          dirty,
          isSubmitting,
          values,
          errors,
          setFieldValue,
          setTouched,
        }: FormikProps<FormValues>) => {
          const isDirty = dirty || this.state.editorDirty;
          const giveTitleLabel = isMobile
            ? this.props.t('commission.giveTitle.mobile')
            : this.props.t('commission.giveTitle');
          const choosePriceLabel = isMobile
            ? this.props.t('commission.choosePrice.mobile')
            : this.props.t('commission.choosePrice');

          return (
            <FormPopup
              className={s['root']}
              isOpen={true}
              title={t<string>(
                deviation
                  ? 'commission.editCommission'
                  : 'commission.newCommission'
              )}
              onSubmit={() => {
                setTouched({
                  [InputNames.Title as string]: true,
                  [InputNames.PointsCost as string]: true,
                });
                isEmpty(errors)
                  ? submitForm()
                  : this.scrollInvalidIntoView(errors);
              }}
              onCancel={isDirty ? this.handleUnsavedClose : onClose}
              onClose={isDirty ? this.handleUnsavedClose : onClose}
              cancelBtnLabel={t('common.cancel')}
              submitBtnLabel={
                deviation ? t('commission.save') : t('commission.create')
              }
              disabledSubmit={!isDirty || isSubmitting}
            >
              <Form onSubmit={submitForm}>
                <Field
                  name={InputNames.Title}
                  render={({ field, form }) => {
                    return (
                      <div>
                        <Input
                          refInput={this.getInputRefHandler(field.name)}
                          value={field.value}
                          name={field.name}
                          onBlur={field.onBlur}
                          label={giveTitleLabel}
                          onChange={value => setFieldValue(field.name, value)}
                          type="text"
                          autoComplete="off"
                          error={form.touched.title && form.errors.title}
                          errorMessage={form.touched.title && form.errors.title}
                          maxLength={TITLE_MAX_LENGTH}
                        />
                      </div>
                    );
                  }}
                />
                {this.renderDesktopEditor()}
                {this.renderMobileEditor()}
                <div className={s['points-cost-line']}>
                  <Field
                    name={InputNames.PointsCost}
                    render={({ field, form }) => {
                      return (
                        <div>
                          <Input
                            refInput={this.getInputRefHandler(field.name)}
                            value={field.value}
                            name={field.name}
                            onBlur={field.onBlur}
                            type="number"
                            className={s['points-cost-input']}
                            label={choosePriceLabel}
                            onChange={value => setFieldValue(field.name, value)}
                            step={POINTS_VALUE_STEP}
                            minValue={POINTS_MIN_VALUE}
                            maxValue={POINTS_MAX_VALUE}
                            autoComplete="off"
                            error={
                              form.touched.pointsCost && form.errors.pointsCost
                            }
                            errorMessage={
                              (form.values.pointsCost ||
                                form.touched.pointsCost) &&
                              form.errors.pointsCost
                            }
                          />
                        </div>
                      );
                    }}
                  />
                  {!isMobile && (
                    <div className={s['input-label']}>
                      <Points className={s['coins-icon']} />
                      {t('common.points', {
                        count: parseInt(values.pointsCost),
                      })}
                    </div>
                  )}
                </div>
              </Form>
              <div className={s['earnings-line']}>
                {!errors.pointsCost && values.pointsCost && (
                  <>
                    <span className={s['earnings-line__your-earnings']}>
                      {t('commission.yourEarnings')}:{' '}
                    </span>
                    <span className={s['earnings-line__points']}>
                      {!errors.pointsCost && values.pointsCost && (
                        <>
                          &nbsp;
                          {
                            (artistPointsProfit =
                              parseInt(values.pointsCost) *
                              (1 - DA_PROFIT_MARGIN))
                          }
                          &nbsp;
                          {t('common.points', {
                            count: artistPointsProfit,
                          })}
                          &nbsp; (
                          {numeral(
                            artistPointsProfit / POINTS_IN_ONE_DOLLAR
                          ).format('$0,0.00')}
                          )
                        </>
                      )}
                    </span>
                  </>
                )}
                <a
                  target="_blank" // eslint-disable-line react/jsx-no-target-blank
                  href="https://about.deviantart.com/points/"
                  className={s['price-faq']}
                >
                  {t('common.faq.whatArePoints')}
                </a>
              </div>
            </FormPopup>
          );
        }}
      />
    );
  }

  handleUnsavedClose = () => {
    this.setState({
      confirmationPopupType: !this.props.deviation
        ? 'leaveCreating'
        : 'discardChanges',
    });
  };

  onCancelCloseConfirmation = () => {
    this.setState({ confirmationPopupType: undefined });
  };

  onConfirmCloseConfirmation = () => {
    this.setState({ confirmationPopupType: undefined });
    this.props.onClose();
  };

  renderDesktopEditor() {
    const { deviation, t, isMobile } = this.props;
    if (isMobile) {
      return null;
    }
    let description: PapiEditorText | undefined;
    if (get(deviation, 'commission.textContent.html.type') !== 'writer') {
      description = get(deviation, 'commission.textContent');
    }
    return (
      <>
        <div
          className={classnames(s['editor-wrapper'], 'da-editor-commission')}
        >
          <DaEditorWrapper
            loadingComponent={LoadingIndicator}
            flavour={EditorFlavourConfigs.COMMISSION}
            onEditorInit={this.handleEditorInit}
            onContentChange={this.handleEditorChange}
            theme={commissionTheme}
            initialContent={description}
            placeholder={t('commission.editor.placeholder')}
            filterPaste={true}
          />
        </div>
        {this.renderFooterToolbar()}
      </>
    );
  }

  renderMobileEditor() {
    const { deviation, t, isMobile } = this.props;
    if (!isMobile) {
      return null;
    }
    const {
      mobileEditorDone,
      mobileEditorVersion,
      openMobileDescriptionEditor,
    } = this.state;

    // If they have edited the text in the fullscreen editor
    // we switch the text to that version

    let description: PapiEditorText | undefined;
    if (get(deviation, 'commission.textContent.html.type') !== 'writer') {
      description = get(deviation, 'commission.textContent');
    }
    if (mobileEditorDone) {
      description = convertToClientStorageState(
        this.editorRawState,
        this.editorContent,
        this.editorFeatures
      ).editorText;
    }

    return (
      <>
        <div
          className={classnames(
            s['editor-wrapper'],
            s['editor-wrapper-mobile']
          )}
          onClick={this.handleOpenMobileDescriptionEdit}
        >
          {!description && t('commission.editor.placeholder')}
          <TextRenderer
            textContent={description}
            reactViewer={CommissionViewer}
            viewerKey={`${deviation &&
              deviation.deviationId}-${mobileEditorVersion}`}
          />
        </div>
        <DaEditorMobileFullscreenPopup
          flavour={EditorFlavourConfigs.COMMISSION}
          isOpen={openMobileDescriptionEditor}
          theme={editorTheme}
          placeholder={t('commission.editor.placeholder')}
          title={t('commission.editor.mobile.title')}
          onDone={this.handleMobileEditDone}
          onCancel={this.handleCloseMobileDescriptionEdit}
          initialContent={description}
        />
      </>
    );
  }

  handleOpenMobileDescriptionEdit = () => {
    this.setState({ openMobileDescriptionEditor: true });
  };

  handleCloseMobileDescriptionEdit = () => {
    this.setState({ openMobileDescriptionEditor: false });
  };

  handleMobileEditDone = (rawContentState, editorContent, featuresData) => {
    this.editorRawState = rawContentState;
    this.editorContent = editorContent;
    this.editorFeatures = featuresData;
    this.setState({
      openMobileDescriptionEditor: false,
      mobileEditorDone: true,
      mobileEditorVersion: this.state.mobileEditorVersion + 1,
    });
  };

  handleEditorInit = toolbars => {
    if (!this.state.footerToolbar && toolbars.FOOTER) {
      this.setState({ footerToolbar: toolbars.FOOTER });
    }
  };

  handleEditorChange = (
    rawContentState: any,
    editorContent: any,
    featuresData: any[]
  ) => {
    this.setState({ editorDirty: true });
    this.editorRawState = rawContentState;
    this.editorContent = editorContent;
    this.editorFeatures = featuresData;
  };

  renderFooterToolbar() {
    const { isMobile } = this.props;
    const { footerToolbar } = this.state;
    if (!footerToolbar) {
      return;
    }
    const FooterToolbar: any = footerToolbar;
    return (
      <div
        className={classnames(
          isMobile && 'daeditor-detached-toolbar',
          editorTheme['editor-footer']
        )}
      >
        <FooterToolbar />
      </div>
    );
  }

  renderConfirmations() {
    return (
      this.state.confirmationPopupType && (
        <CommissionConfirmation
          isOpen={true}
          confirmationType={this.state.confirmationPopupType!}
          onCancel={this.onCancelCloseConfirmation}
          onConfirm={this.onConfirmCloseConfirmation}
        />
      )
    );
  }

  render() {
    return (
      <>
        {this.renderForm()}
        {this.renderConfirmations()}
      </>
    );
  }
}

export default withMobileContext(withTranslation()(CommissionEdit));
