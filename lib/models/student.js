'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');
const _ = require("underscore");
const { Model } = require('./helpers');
const CONSTANTS = require('../constants');

module.exports = class Student extends Model {

    static get tableName() {

        return 'students';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),

            // student details
            name: Joi.string(),
            gender: Joi.number().integer().valid( ..._.values(CONSTANTS.studentDetails.gender) ),
            dob: Joi.date().allow(null),
            whatsapp: Joi.string().length(10).allow(null),
            email: Joi.string().email().allow(null),

            // geographic details
            state: Joi.string().valid( ..._.keys(CONSTANTS.studentDetails.states) ),
            city: Joi.string().allow(null),
            gpsLat: Joi.string().allow(null),
            gpsLong: Joi.string().allow(null),
            pinCode: Joi.string().allow(null),

            // other details
            qualification: Joi.number().integer().valid( ..._.values(CONSTANTS.studentDetails.qualification) ).allow(null),
            currentStatus: Joi.number().integer().valid( ..._.values(CONSTANTS.studentDetails.currentStatus) ).allow(null),
            schoolMedium: Joi.number().integer().valid( ..._.values(CONSTANTS.studentDetails.schoolMedium) ).allow(null),
           
            // Student academic detalis of 10th and 12th class 
            percentageIn10th: Joi.string().allow(null),
            mathMarksIn10th: Joi.string().allow(null), 
            percentageIn12th: Joi.string().allow(null),
            mathMarksIn12th: Joi.string().allow(null),

            // privilege related
            caste: Joi.number().integer().valid( ..._.values(CONSTANTS.studentDetails.caste) ).allow(null),
            religon: Joi.number().integer().valid( ..._.values(CONSTANTS.studentDetails.religon) ).allow(null),

            // partner ID
            partnerId: Joi.number().integer().greater(0),

            stage: Joi.string().allow(CONSTANTS.studentStages).required(),
            createdAt: Joi.date(),
        });

    }

    static get relationMappings() {
        const Contact = require('./studentContact');
        const Partner = require('./partner');

        return {
            partner: {
                relation: Model.BelongsToOneRelation,
                modelClass: Partner,
                join: {
                    from: 'students.partnerId',
                    to: 'partners.id'
                }
            },
            contacts: {
                relation: Model.HasManyRelation,
                modelClass: Contact,
                join: {
                    from: 'students.id',
                    to: 'contacts.studentId'
                }
            }
        }
    }

    $beforeInsert(ctx) {
        const now = new Date();
        this.createdAt = now;
    }

};
