/**
 * @fileoverview Rules to enforce using fp-ts instead of problematic javascript patterns
 * @author Sandro Maglione
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */
const rules = {
  // Use `Option` instead of `undefined`
  "option-over-undefined": {
    meta: {
      type: "problem",
      docs: {
        description: "avoid using undefined in return type, use Option instead",
        category: "Signature Error",
        recommended: true,
      },
    },
    create: function (context) {
      return {
        TSUnionType(node) {
          if (
            node.types.length === 2 &&
            node.types.some((type) => type.type === "TSUndefinedKeyword")
          ) {
            context.report({
              node: node,
              message:
                "do not mark a union type with 'undefined', use Option instead",
            });
          }
        },
      };
    },
  },
  // Use `Option` instead of `null`
  "option-over-null": {
    meta: {
      type: "problem",
      docs: {
        description: "avoid using null in return type, use Option instead",
        category: "Signature Error",
        recommended: true,
      },
    },
    create: function (context) {
      return {
        TSUnionType(node) {
          if (
            node.types.length === 2 &&
            node.types.some((type) => type.type === "TSNullKeyword")
          ) {
            context.report({
              node: node,
              message:
                "do not mark a union type with 'null', use Option instead",
            });
          }
        },
      };
    },
  },
  // Do not access potentially undefined array index
  "array-head": {
    meta: {
      type: "problem",
      docs: {
        description:
          "do not access potentially undefined array index, use `head` instead",
        category: "Signature Error",
        recommended: true,
      },
    },
    create: function (context) {
      return {
        MemberExpression(node) {
          if (
            typeof node.property.value === "number" &&
            node.property.value === 0
          ) {
            context.report({
              node: node,
              message:
                "do not access potentially undefined array element, use `head` instead",
            });
          }
        },
      };
    },
  },
  // Do not access potentially undefined array index
  "array-lookup": {
    meta: {
      type: "problem",
      docs: {
        description:
          "do not access potentially undefined array index, use `lookup` instead",
        category: "Signature Error",
        recommended: true,
      },
    },
    create: function (context) {
      return {
        MemberExpression(node) {
          if (
            typeof node.property.value === "number" &&
            node.property.value > 0
          ) {
            context.report({
              node: node,
              message:
                "do not access potentially undefined array element, use `lookup` instead",
            });
          }
        },
      };
    },
  },
  // Do not access potentially undefined record (map) element
  "record-lookup": {
    meta: {
      type: "problem",
      docs: {
        description:
          "do not access potentially undefined record element, use `lookup` instead",
        category: "Signature Error",
        recommended: true,
      },
    },
    create: function (context) {
      return {
        MemberExpression(node) {
          if (
            typeof node.property.value === "string" ||
            typeof node.property.name === "string"
          ) {
            context.report({
              node: node,
              message:
                "do not access potentially undefined record element, use `lookup` instead",
            });
          }
        },
      };
    },
  },
};

module.exports = {
  rules,
  configs: {
    recommended: {
      rules: {
        "fp-ts-strict/option-over-undefined": "error",
        "fp-ts-strict/option-over-null": "error",
        "fp-ts-strict/array-head": "error",
        "fp-ts-strict/array-lookup": "error",
        "fp-ts-strict/record-lookup": "error",
      },
    },
  },
};
