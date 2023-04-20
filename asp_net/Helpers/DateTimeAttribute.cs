﻿using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace asp_net.Helpers;

public class DateTimeAttribute : ValidationAttribute
{
	protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
	{
		if (value == null)
			return new ValidationResult($"Email is required");

		if (!DateTime.TryParse((string)value, new CultureInfo("fr-FR"), DateTimeStyles.None, out DateTime valueDateTime))
			return new ValidationResult($"Email format not accepted");

		return ValidationResult.Success;
	}
}