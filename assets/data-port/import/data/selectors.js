import { steps } from '../steps';
import { levels } from '../levels';

/**
 * Is fetching importer data selector.
 *
 * @param {Object} state Current state.
 *
 * @return {boolean} Is fetching.
 */
export const isFetching = ( state ) => state.isFetching;

/**
 * Get the import job ID.
 *
 * @param {Object} state Current state.
 *
 * @return {string} Job ID.
 */
export const getJobId = ( state ) => state.jobId;

/**
 * Fetch importer error selector.
 *
 * @param {Object} state Current state.
 *
 * @return {Object|boolean} Error object or false.
 */
export const getFetchError = ( state ) => state.fetchError;

/**
 * Step state selector.
 *
 * @param {Object}  state Current state.
 * @param {string}  step  Step name.
 *
 * @return {Object} Step data.
 */
export const getStepData = ( state, step ) => state[ step ];

/**
 * Get navigation steps with their state.
 *
 * @param {Object} state current state.
 *
 * @return {Array} Navigation steps.
 */
export const getNavigationSteps = ( { completedSteps } ) => {
	const navSteps = steps.map( ( step ) => ( {
		...step,
		isComplete: completedSteps.includes( step.key ),
		isNext: false,
	} ) );

	const nextStep =
		navSteps.find( ( step ) => ! step.isComplete ) || navSteps[ 0 ];
	nextStep.isNext = true;

	return navSteps;
};

/**
 * Get whether step is complete or not.
 *
 * @param {Object} state Current state.
 * @param {string} step  Step name.
 *
 * @return {boolean} Step complete.
 */
export const isCompleteStep = ( { completedSteps }, step ) =>
	completedSteps.includes( step );

/**
 * Get whether the importer is ready to start.
 *
 * @param {Object} state Current state.
 *
 * @return {boolean} If the importer is ready.
 */
export const isReadyToStart = ( state ) => {
	const levelsState = levels.map( ( { key } ) => state.upload[ key ] );
	const hasUploaded = levelsState.some( ( level ) => level.isUploaded );
	const inProgress = levelsState.some(
		( level ) => level.isUploading || level.isDeleting
	);

	return hasUploaded && ! inProgress;
};

/**
 * Get uploaded level keys.
 *
 * @param {Object} state Current state.
 *
 * @return {string[]} Array of uploaded level keys.
 */
export const getUploadedLevelKeys = ( { upload } ) =>
	levels
		.filter( ( { key } ) => upload[ key ].isUploaded )
		.map( ( { key } ) => key );
