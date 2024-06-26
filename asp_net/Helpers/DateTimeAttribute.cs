﻿using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace asp_net.Helpers;

public class DateTimeAttribute : ValidationAttribute
{
	protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
	{
		if (value == null)
			return new ValidationResult($"{validationContext.DisplayName} is required");

		if (!DateTime.TryParseExact((string)value, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime result))
			return new ValidationResult($"{validationContext.DisplayName} format not accepted");

		return ValidationResult.Success;
	}
}